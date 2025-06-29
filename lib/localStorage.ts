import type { ContactFormData, SelectedProduct } from "@/types";

const FORM_STORAGE_KEY = "contactFormData";

// Save
export function saveFormData(data: ContactFormData) {
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
}

// Load
export function loadFormData(): ContactFormData | null {
  const raw = localStorage.getItem(FORM_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ContactFormData;
  } catch {
    return null;
  }
}
