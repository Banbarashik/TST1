const LETTER = /[A-Za-zА-Яа-яЁё]/;
const DIGIT_OR_SPECIAL = /[0-9xX×хХ.]/; // цифры, лат/кир X, знак умножения, точка

export function filterTermsForSnippet(terms: string[] = []) {
  // оставляем только чисто буквенные термы (можно с дефисом)
  return terms.filter((t) => LETTER.test(t) && !DIGIT_OR_SPECIAL.test(t));
}

export function highlight(text: string, terms: string[]) {
  if (!text || !terms?.length) return text || "";
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp("(" + terms.map(esc).join("|") + ")", "gi");
  return text.replace(re, "<strong>$1</strong>");
}
