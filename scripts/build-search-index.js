// scripts/build-search-index.js
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { setTimeout as wait } from "timers/promises";
import { JSDOM } from "jsdom";

const PORT = Number(process.env.SEARCH_PORT || 4010);
const BASE = process.env.SEARCH_BASE_URL || `http://localhost:${PORT}`;
const OUT = path.join(process.cwd(), "public", "search-index.json");
const PRERENDER = path.join(process.cwd(), ".next", "prerender-manifest.json");

// Исключаемые маршруты
const EXCLUDE_EXACT = new Set(["/", "/_not-found", "/test"]);
const EXCLUDE_PATTERNS = [/^\/catalog\/\[category\]$/];

// ===== Настройки извлечения текста =====

// Контейнеры, ИЗ которых берём контент (если нет — fallback к body)
const INCLUDE_ROOTS =
  "main, article, [data-search-include], .content, .prose, .markdown-body";

// Разрешённые текстовые теги внутри корней (меньше шума)
const TEXT_NODES = "h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,dt,dd";

// Узлы, которые выкидываем целиком ДО извлечения текста
const STRIP_SELECTORS = [
  "head",
  "script",
  "style",
  "nav",
  "aside",
  "footer",
  "noscript",
  "template",
  "table",
  "a",
  "button",
  "[hidden]",
  "[aria-hidden='true']",
  "[data-search-exclude]", // точечное исключение через атрибут
  ".search-exclude",
  ".sr-only",
  ".visually-hidden",
];

// Паттерны CTA/служебных фраз (будут удалены из текста)
const CTA_PATTERNS = [
  /\bв\s+заявк[ауе]\b/gi,
  /\bв\s+корзин[еуы]\b/gi,
  /\bкупить\b/gi,
  /\bзаказать\b/gi,
  /\bоформить(?:\s+заказ|(?:\s+)?заявку)?\b/gi,
  /\bузнать\s+больше\b/gi,
  /\bподробнее\b/gi,
  /\bчитать\s+далее\b/gi,
  /\bсмотреть\s+все\b/gi,
  /\bскачать\b/gi,
  /\bpdf\b/gi,
  /\bпечать\b/gi,
  /\bназад\b/gi,
  /\bнаверх\b/gi,
  /\bв\s+каталог\b/gi,
];

// Минимальные пороги для включения фрагмента
const MIN_CHARS = 25; // слишком короткие куски выбрасываем
const MIN_WORDS = 3;

// ======================================

async function waitForReady(url, tries = 60, delayMs = 500) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return;
    } catch {}
    await wait(delayMs);
  }
  throw new Error("Next server did not become ready in time.");
}

function shouldExclude(route) {
  if (EXCLUDE_EXACT.has(route)) return true;
  return EXCLUDE_PATTERNS.some((re) => re.test(route));
}

function cleanupText(s) {
  if (!s) return "";
  // NBSP -> space, коллапс пробелов
  let txt = s
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  // срезаем CTA-фразы
  for (const re of CTA_PATTERNS) txt = txt.replace(re, " ");
  txt = txt.replace(/\s+/g, " ").trim();
  return txt;
}

function extractVisibleText(html) {
  const dom = new JSDOM(html);
  const d = dom.window.document;

  // title берём до зачистки head
  const title =
    d.querySelector("title")?.textContent?.trim() ||
    d.querySelector("h1")?.textContent?.trim() ||
    "";

  // сносим шумные узлы
  for (const sel of STRIP_SELECTORS) {
    d.querySelectorAll(sel).forEach((el) => el.remove());
  }

  // выбираем корни с полезным контентом
  let roots = Array.from(d.querySelectorAll(INCLUDE_ROOTS));
  if (!roots.length && d.body) roots = [d.body];

  const chunks = [];

  for (const root of roots) {
    // берём только блоки с текстом
    const nodes = root.querySelectorAll(TEXT_NODES);

    for (const el of nodes) {
      // не индексируем фрагменты, явно исключённые родителями
      if (el.closest("[data-search-exclude], .search-exclude")) continue;

      // пропустим ссылки/кнопки-cta целиком (если всё содержимое — линк-кнопка)
      if (
        el.matches("a,button") ||
        el.closest("button,[role='button'],[data-cta],.btn,.button,.cta")
      ) {
        continue;
      }

      let txt = cleanupText(el.textContent || "");
      // выбрасываем очень короткие/служебные куски
      const wordCount = (txt.match(/[A-Za-zА-Яа-яЁё0-9]+/g) || []).length;
      if (txt.length < MIN_CHARS || wordCount < MIN_WORDS) continue;

      chunks.push(txt);
    }
  }

  // Склеиваем и финальная нормализация
  let content = cleanupText(chunks.join(" "));
  return { title, content };
}

function getConcreteRoutesFromManifest() {
  const raw = fs.readFileSync(PRERENDER, "utf8");
  const manifest = JSON.parse(raw);
  let routes = Object.keys(manifest.routes || {});
  routes = routes.filter((r) => !shouldExclude(r));
  return routes;
}

async function crawl(routes) {
  const entries = [];
  for (const u of routes) {
    const res = await fetch(`${BASE}${u}`, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`Skip ${u}: HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();
    const { title, content } = extractVisibleText(html);
    entries.push({ title: title || u, url: u, content });
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(entries, null, 2), "utf8");
  console.log(`✅ search-index.json written: ${entries.length} entries`);
}

async function main() {
  const routes = getConcreteRoutesFromManifest();
  if (!routes.length) {
    throw new Error("No SSG routes found in .next/prerender-manifest.json");
  }

  const server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)],
    { stdio: "inherit" },
  );

  try {
    await waitForReady(`${BASE}/`);
    await crawl(routes);
  } finally {
    server.kill("SIGINT");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
