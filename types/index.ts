export type Category = {
  title?: string;
  menuTitle: string;
  slug: string;
  description?: string[];
  children?: Category[];
};

export type Product = {
  id: string;
  name: string;
  categories?: string[];
  airPower?: number;
  heatPower?: number;
  price?: number;
  img?: string;
  drawing?: string;
  calculator?: string;
  variants?: Product[];
};

export type SelectedProduct = {
  id: string;
  amount: number;
};

export type SelectedProductWithData = Product & { amount: number };

export interface ContactFormData {
  username?: string;
  company?: string;
  email: string;
  region?: string;
  products: SelectedProduct[];
  message: string;
}
