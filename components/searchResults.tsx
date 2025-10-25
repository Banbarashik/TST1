// components/SearchResults.tsx
"use client";

import searchIndex from "@/public/search-index.json";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MiniSearch from "minisearch";

import { highlight, filterTermsForSnippet } from "@/helpers/highlight";
import { makeSnippet } from "@/lib/snippet";

import { Input } from "@/components/ui/input";

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
        fuzzy: 0.4,
        combineWith: "AND",
      },
      tokenize: (s) => s.toLowerCase().match(/[a-zа-яё0-9]+/gi) || [],
    });
    ms.addAll(docs); // ← добавляем РОВНО один раз
    return ms;
  }, [docs]);

  useEffect(() => {
    if (!miniSearch || !q) return setResults([]);

    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // feature-detect Unicode property escapes; fall back if not available
    const supportsUnicodeProps = (() => {
      try {
        // @ts-ignore -- runtime feature test
        new RegExp("\\p{L}", "u");
        return true;
      } catch {
        return false;
      }
    })();

    const raw = miniSearch.search(q);
    const qNorm = q.toLowerCase().replace(/\s+/g, " ").trim();
    const boosted = raw
      .map((r) => {
        const doc = docsMap.get(r.id);
        const title = (doc?.title || "").toLowerCase();
        const content = (doc?.content || "").toLowerCase();

        // Use terms returned by MiniSearch if available, otherwise split query
        const terms = r.terms && r.terms.length ? r.terms : q.split(/\s+/);

        let score = r.score ?? 0;
        // very large boost if entire normalized query appears verbatim
        if (qNorm && (title.includes(qNorm) || content.includes(qNorm))) {
          score += 2000;
        }
        for (const term of terms) {
          if (!term) continue;
          const t = String(term).toLowerCase();
          const e = esc(t);

          // Unicode-aware whole-word check (letters & numbers). Fallback to ascii-friendly check.
          const re = supportsUnicodeProps
            ? new RegExp(`(?<![\\p{L}\\p{N}])${e}(?![\\p{L}\\p{N}])`, "iu")
            : new RegExp(`(^|[^A-Za-z0-9])${e}([^A-Za-z0-9]|$)`, "i");

          if (re.test(title)) score += 100;
          if (re.test(content)) score += 40;
        }

        return { ...r, score, _doc: doc };
      })
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    setResults(boosted);
  }, [q, miniSearch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (!v) return;
    router.replace(`/search?q=${encodeURIComponent(v)}`);
    // страница перегрузится сервером с новым searchParams, и initialQuery обновится
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4">
      <form onSubmit={onSubmit}>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Поиск…"
        />
      </form>

      <ul className="space-y-6">
        {results.slice(0, 20).map((r) => {
          const termsTitle = r.terms || []; // в title подсвечиваем всё
          const termsBody = filterTermsForSnippet(termsTitle); // в сниппете — без чисел/«16x1.5»

          const doc = docsMap.get(r.id);
          if (!doc) return null;

          const titleHtml = highlight(doc.title, termsTitle);
          const snippetHtml = makeSnippet(doc.content, termsBody, {
            minCtx: 80,
            maxLen: 720,
          });

          return (
            <li key={r.id} className="flex flex-col">
              <Link
                href={doc.url}
                className="text-primary-darker hover:text-primary-dark mb-1.5 text-[15px]"
                dangerouslySetInnerHTML={{ __html: titleHtml }}
              />
              {snippetHtml && (
                <p
                  className="pb-6 text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: snippetHtml }}
                />
              )}
              <span className="h-px w-full bg-gray-300"></span>
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
