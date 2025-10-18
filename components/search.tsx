"use client";

import { useEffect, useMemo, useState } from "react";
import MiniSearch from "minisearch";

import searchIndex from "@/public/search-index.json";

import { highlight, filterTermsForSnippet } from "@/helpers/highlight";
import { makeSnippet } from "@/lib/snippet";

type Doc = { title: string; url: string; content: string };

export default function Search() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<[]>([]);

  // 🔹 docsMap: быстрый доступ к полному документу по URL
  const docsMap = useMemo(() => {
    const m = new Map<string, Doc>();
    for (const d of docs) m.set(d.url, d);
    return m;
  }, [docs]);

  const miniSearch = useMemo(
    () =>
      new MiniSearch<Doc>({
        idField: "url",
        fields: ["title", "content"],
        storeFields: ["title", "url"],
        searchOptions: {
          boost: { title: 6, content: 1 },
          prefix: true,
          fuzzy: 0.1,
          combineWith: "AND", // ← ключевое
        },
        tokenize: (s) => s.toLowerCase().match(/[a-zа-яё0-9]+/gi) || [],
      }),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    if (cancelled) return;
    setDocs(searchIndex);
    miniSearch.addAll(searchIndex);
    return () => {
      cancelled = true;
    };
  }, [miniSearch]);

  // Поиск
  useEffect(() => {
    if (!q) return void setResults([]);
    setResults(miniSearch.search(q));
  }, [q, miniSearch]);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Поиск…"
      />
      <ul className="space-y-5">
        {results.slice(0, 20).map((r) => {
          const termsTitle = r.terms || []; // ← для title — без фильтра
          const termsBody = filterTermsForSnippet(termsTitle); // ← для сниппета

          const doc = docsMap.get(r.id)!; // где ты быстро получаешь {title, content}
          const snippetHtml = makeSnippet(doc.content, termsBody, {
            minCtx: 80,
            maxLen: 240,
          });
          const titleHtml = highlight(doc.title, termsTitle); // числа подсвечиваются как раньше

          return (
            <li key={r.id}>
              <a
                href={r.id}
                dangerouslySetInnerHTML={{ __html: titleHtml }}
                className="text-blue-500"
              />
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
