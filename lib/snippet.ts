import { filterTermsForSnippet } from "@/helpers/highlight";

export function makeSnippet(
  text: string,
  terms: string[],
  opts: { minCtx?: number; maxLen?: number } = {},
): string {
  if (!text) return "";
  const t = filterTermsForSnippet(terms);
  const minCtx = opts.minCtx ?? 80;
  const maxLen = opts.maxLen ?? 240;

  const lower = text.toLowerCase();
  let pos = -1,
    hitLen = 0;

  for (const term of t) {
    const q = String(term).toLowerCase();
    const i = lower.indexOf(q);
    if (i !== -1 && (pos === -1 || i < pos)) {
      pos = i;
      hitLen = q.length;
    }
  }

  if (pos === -1) {
    const s = text.slice(0, maxLen);
    return s + (s.length < text.length ? "…" : "");
  }

  let start = Math.max(0, pos - minCtx);
  let end = Math.min(text.length, pos + hitLen + minCtx);

  const ls = text.lastIndexOf(" ", start);
  const rs = text.indexOf(" ", end);
  if (ls !== -1) start = ls + 1;
  if (rs !== -1) end = rs;

  if (end - start < maxLen) {
    const extra = Math.floor((maxLen - (end - start)) / 2);
    start = Math.max(0, start - extra);
    end = Math.min(text.length, end + extra);
  }

  let snippet = text.slice(start, end);
  if (t.length) {
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp("(" + t.map(esc).join("|") + ")", "gi");
    snippet = snippet.replace(re, "<strong>$1</strong>");
  }
  return (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : "");
}
