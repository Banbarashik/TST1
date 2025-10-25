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

  // Find the first matching term position
  for (const term of t) {
    const q = String(term).toLowerCase();
    const i = lower.indexOf(q);
    if (i !== -1 && (pos === -1 || i < pos)) {
      pos = i;
      hitLen = q.length;
    }
  }

  // If no terms found, return the start of text up to a word boundary
  if (pos === -1) {
    let end = maxLen;
    const spacePos = text.lastIndexOf(" ", maxLen);
    if (spacePos !== -1) end = spacePos;
    return text.slice(0, end) + (end < text.length ? "…" : "");
  }

  // Calculate initial bounds
  let start = Math.max(0, pos - minCtx);
  let end = Math.min(text.length, pos + hitLen + minCtx);

  // Expand to word boundaries
  const startWordPos = text.indexOf(" ", start - 20);
  const endWordPos = text.lastIndexOf(" ", end + 20);

  if (startWordPos !== -1 && startWordPos < pos) start = startWordPos + 1;
  if (endWordPos !== -1 && endWordPos > pos + hitLen) end = endWordPos;

  // If snippet is shorter than maxLen, expand while maintaining word boundaries
  if (end - start < maxLen) {
    const extra = Math.floor((maxLen - (end - start)) / 2);

    let newStart = start;
    let newEnd = end;

    const startExpand = text.lastIndexOf(" ", start - extra);
    if (startExpand !== -1) newStart = startExpand + 1;

    const endExpand = text.indexOf(" ", end + extra);
    if (endExpand !== -1) newEnd = endExpand;

    start = Math.max(0, newStart);
    end = Math.min(text.length, newEnd);
  }

  let snippet = text.slice(start, end);

  // Highlight matching terms
  if (t.length) {
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp("(" + t.map(esc).join("|") + ")", "gi");
    snippet = snippet.replace(re, "<strong>$1</strong>");
  }

  return (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : "");
}
