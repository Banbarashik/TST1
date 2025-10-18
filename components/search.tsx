"use client";

import { useEffect, useMemo, useState } from "react";
import MiniSearch from "minisearch";

import searchIndex from "@/public/search-index.json";

function highlight(text: string, terms: string[]) {
  if (!text || !terms?.length) return text || "";
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp("(" + terms.map(esc).join("|") + ")", "gi");
  return text.replace(re, "<strong>$1</strong>");
}

// utils/snippet.ts
export function makeSnippet(
  text: string,
  terms: string[],
  opts: { minCtx?: number; maxLen?: number } = {},
): string {
  if (!text) return "";
  const minCtx = opts.minCtx ?? 60; // минимум контекста слева/справа
  const maxLen = opts.maxLen ?? 220; // максимум длина сниппета

  const lower = text.toLowerCase();
  // найдём первое по позиции совпадение
  let pos = -1,
    hitLen = 0;
  // hitTerm = "";
  for (const t of terms ?? []) {
    const q = String(t).toLowerCase();
    const i = lower.indexOf(q);
    if (i !== -1 && (pos === -1 || i < pos)) {
      pos = i;
      hitLen = q.length;
      // hitTerm = q;
    }
  }

  // если ничего не нашли — показываем начало текста
  if (pos === -1) {
    const s = text.slice(0, maxLen);
    return s + (s.length < text.length ? "…" : "");
  }

  // расширяем границы до пробелов (чтобы не резать слова)
  let start = Math.max(0, pos - minCtx);
  let end = Math.min(text.length, pos + hitLen + minCtx);

  // подравняем по ближайшим пробелам
  const leftSpace = text.lastIndexOf(" ", start);
  const rightSpace = text.indexOf(" ", end);
  if (leftSpace !== -1) start = leftSpace + 1;
  if (rightSpace !== -1) end = rightSpace;

  // если всё ещё коротко — дотянем до maxLen
  if (end - start < maxLen) {
    const extra = Math.floor((maxLen - (end - start)) / 2);
    start = Math.max(0, start - extra);
    end = Math.min(text.length, end + extra);
  }

  let snippet = text.slice(start, end);

  // подсветка всех термов
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp("(" + (terms ?? []).map(esc).join("|") + ")", "gi");
  snippet = snippet.replace(re, "<strong>$1</strong>");

  return (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : "");
}

export default function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<[]>([]);

  // quick lookup for content by URL (or id)
  const contentByUrl = useMemo(() => {
    const m = new Map<string, string>();
    for (const d of searchIndex) m.set(d.url, d.content || "");
    return m;
  }, [searchIndex]);

  const miniSearch = useMemo(
    () =>
      new MiniSearch({
        idField: "url",
        fields: ["title", "content"],
        storeFields: ["title", "url"],
        searchOptions: {
          boost: { title: 6, content: 1 },
          prefix: true,
          fuzzy: 0.2,
          combineWith: "AND", // ← ключевое
        },
        tokenize: (s) => s.toLowerCase().match(/[a-zа-яё0-9]+/gi) || [],
      }),
    [],
  );

  useEffect(() => {
    miniSearch.addAll(searchIndex);
  }, [miniSearch]);

  useEffect(() => {
    if (!q) return setResults([]);
    setResults(miniSearch.search(q)); // each result has result.terms
  }, [q, miniSearch]);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Поиск…"
      />
      <ul>
        {results.slice(0, 20).map((r) => {
          const content = contentByUrl.get(r.id) || "";
          const snippetHtml = makeSnippet(content, r.terms || [], {
            minCtx: 80,
            maxLen: 240,
          });
          const titleHtml = highlight(
            searchIndex.find((d) => d.url === r.id)?.title ?? "",
            r.terms || [],
          );

          return (
            <li key={r.id}>
              <a href={r.id} dangerouslySetInnerHTML={{ __html: titleHtml }} />
              {snippetHtml && (
                <p dangerouslySetInnerHTML={{ __html: snippetHtml }} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
