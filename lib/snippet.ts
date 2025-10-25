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

  // Prefer an exact multi-term phrase if available (e.g. "для сушки зерна")
  if (t.length > 1) {
    const phrase = t.join(" ").toLowerCase().replace(/\s+/g, " ").trim();
    if (phrase) {
      const pIdx = lower.indexOf(phrase);
      if (pIdx !== -1) {
        pos = pIdx;
        hitLen = phrase.length;
      }
    }
  }

  // Find all term occurrences (for proximity scoring)
  const occurrences: { pos: number; len: number; term: string }[] = [];
  if (pos === -1) {
    for (const term of t) {
      const q = String(term).toLowerCase();
      if (!q) continue;
      let start = 0;
      while (true) {
        const i = lower.indexOf(q, start);
        if (i === -1) break;
        occurrences.push({ pos: i, len: q.length, term: q });
        start = i + 1;
      }
    }
  }

  // If we found no exact phrase and have occurrences, pick the best occurrence
  // using a proximity scoring pass (prefer dense clusters / nearby matches).
  if (pos === -1 && occurrences.length) {
    let bestScore = -Infinity;
    let bestOcc: { pos: number; len: number; term: string } | null = null;

    for (const occ of occurrences) {
      // window around this occurrence
      const windowStart = Math.max(0, occ.pos - minCtx);
      const windowEnd = Math.min(text.length, occ.pos + occ.len + minCtx);

      // score: sum of term-length weighted by proximity (closer -> higher weight)
      let score = 0;
      const seen = new Set<string>();
      const center = occ.pos + occ.len / 2;
      for (const o2 of occurrences) {
        if (o2.pos < windowStart || o2.pos > windowEnd) continue;
        if (seen.has(o2.term)) {
          // duplicates of same term contribute less
          score += (o2.len * 0.25) / (1 + Math.abs(center - o2.pos) / 100);
        } else {
          seen.add(o2.term);
          score += o2.len / (1 + Math.abs(center - o2.pos) / 100);
        }
      }

      // small bias for earlier positions to prefer earlier matches when scores equal
      score -= windowStart / 100000;

      if (score > bestScore) {
        bestScore = score;
        bestOcc = occ;
      }
    }

    if (bestOcc) {
      pos = bestOcc.pos;
      hitLen = bestOcc.len;
    }
  }

  // If still no match, return the start of text up to a word boundary
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
  const startWordPos = text.indexOf(" ", Math.max(0, start - 20));
  const endWordPos = text.lastIndexOf(" ", Math.min(text.length, end + 20));

  if (startWordPos !== -1 && startWordPos < pos) start = startWordPos + 1;
  if (endWordPos !== -1 && endWordPos > pos + hitLen) end = endWordPos;

  // If snippet is shorter than maxLen, expand while maintaining word boundaries
  if (end - start < maxLen) {
    const extra = Math.floor((maxLen - (end - start)) / 2);

    let newStart = start;
    let newEnd = end;

    const startExpand = text.lastIndexOf(" ", Math.max(0, start - extra));
    if (startExpand !== -1) newStart = startExpand + 1;

    const endExpand = text.indexOf(" ", Math.min(text.length, end + extra));
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
