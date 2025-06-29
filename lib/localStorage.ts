import type { ContactFormData } from "@/types";

const FORM_STORAGE_KEY = "contactFormData";

export function saveFormData(data: ContactFormData) {
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
}

export function loadFormData(): ContactFormData | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(FORM_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ContactFormData;
  } catch {
    return null;
  }
}
