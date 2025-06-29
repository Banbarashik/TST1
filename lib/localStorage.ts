import type { ContactFormData } from "@/types";

import { FORM_STORAGE_KEY } from "@/constants";

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

export function removeFormData() {
  localStorage.removeItem(FORM_STORAGE_KEY);
}
