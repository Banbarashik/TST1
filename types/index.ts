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
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
  headers?: string[];
  textContent?: string[];
  tableData?: ProductTableData;
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

export interface TableCellData {
  content: React.ReactNode;
  colspan?: number;
  rowspan?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableRowData {
  cells: TableCellData[];
}

export interface ProductTableData {
  headers: TableRowData[];
  rows: TableRowData[];
  caption?: string;
}
