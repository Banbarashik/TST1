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

// Что НЕ индексируем как маршруты
const EXCLUDE_EXACT = new Set(["/", "/_not-found", "/test"]);
const EXCLUDE_PATTERNS = [/^\/catalog\/\[category\]$/];

// --- helpers ---

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

function extractVisibleText(html) {
  const dom = new JSDOM(html);
  const d = dom.window.document;

  // Заголовок берём ДО удаления <head>
  const title =
    d.querySelector("title")?.textContent?.trim() ||
    d.querySelector("h1")?.textContent?.trim() ||
    "";

  // Удаляем "шумные" узлы, чтобы в контент не попали скрипты и навигация
  const STRIP_SELECTORS = [
    "head",
    "script",
    "style",
    "nav",
    "aside",
    "footer",
    "noscript",
    "template",
    "[hidden]",
    "[aria-hidden='true']",
  ];
  for (const sel of STRIP_SELECTORS) {
    d.querySelectorAll(sel).forEach((el) => el.remove());
  }

  // Берём только ТЕКСТ
  let text = d.body?.textContent || "";
  // Нормализуем пробелы и NBSP
  text = text
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return { title, content: text };
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
