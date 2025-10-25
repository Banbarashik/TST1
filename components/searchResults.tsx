// components/SearchResults.tsx
"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MiniSearch from "minisearch";
import searchIndex from "@/public/search-index.json";

import { highlight, filterTermsForSnippet } from "@/helpers/highlight";
import { makeSnippet } from "@/lib/snippet";
import Link from "next/link";
import { Input } from "./ui/input";

type Doc = { title: string; url: string; content: string };

export default function SearchResults({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [q, setQ] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  const fetchedOnce = useRef(false);
  useEffect(() => {
    if (fetchedOnce.current) return; // защита от StrictMode (dev)
    fetchedOnce.current = true;

    const unique = Array.from(
      new Map(searchIndex.map((d) => [d.url, d])).values(),
    );
    setDocs(unique);
  }, []);

  useEffect(() => {
    setQ(initialQuery);
  }, [initialQuery]);

  const docsMap = useMemo(() => {
    const m = new Map<string, Doc>();
    (docs ?? []).forEach((d) => m.set(d.url, d));
    return m;
  }, [docs]);

  const miniSearch = useMemo(() => {
    if (!docs) return null;
    const ms = new MiniSearch<Doc>({
      idField: "url",
      fields: ["title", "content"],
      storeFields: ["title", "url"],
      searchOptions: {
        boost: { title: 6, content: 1 },
        prefix: true,
        fuzzy: 0.2,
        combineWith: "AND",
      },
      tokenize: (s) => s.toLowerCase().match(/[a-zа-яё0-9]+/gi) || [],
    });
    ms.addAll(docs); // ← добавляем РОВНО один раз
    return ms;
  }, [docs]);

  useEffect(() => {
    if (!miniSearch || !q) return setResults([]);
    setResults(miniSearch.search(q));
  }, [q, miniSearch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (!v) return;
    router.replace(`/search?q=${encodeURIComponent(v)}`);
    // страница перегрузится сервером с новым searchParams, и initialQuery обновится
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4">
      <form onSubmit={onSubmit}>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Поиск…"
        />
      </form>

      <ul className="space-y-5">
        {results.slice(0, 20).map((r) => {
          const termsTitle = r.terms || []; // в title подсвечиваем всё
          const termsBody = filterTermsForSnippet(termsTitle); // в сниппете — без чисел/«16x1.5»

          const doc = docsMap.get(r.id);
          if (!doc) return null;

          const titleHtml = highlight(doc.title, termsTitle);
          const snippetHtml = makeSnippet(doc.content, termsBody, {
            minCtx: 80,
            maxLen: 240,
          });

          return (
            <li key={r.id}>
              <Link
                href={doc.url}
                className="text-blue-600 hover:underline"
                dangerouslySetInnerHTML={{ __html: titleHtml }}
              />
              {snippetHtml && (
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: snippetHtml }}
                />
              )}
            </li>
          );
        })}
        {!results.length && q && (
          <li className="text-sm text-gray-500">Ничего не найдено</li>
        )}
      </ul>
    </div>
  );
}
