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
  variants?: ProductVariant[];
  categories: string[];
  prevProduct?: {
    slug: string;
    name: string;
  };
  nextProduct?: {
    slug: string;
    name: string;
  };
  airPower: number;
  heatPower?: number;
  price?: number;
  img: string;
  drawing: string;
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
  headers: string[];
  textContent: string[];
  tableData: ProductTableData[];
};

export type PritochnyProduct = Product & {
  calculator: string;
};

export type KSKProduct = Product & {
  tableWithTabs: string;
};

export type ProductVariant = Omit<
  Product,
  | "variants"
  | "categories"
  | "nextProduct"
  | "airPower"
  | "img"
  | "drawing"
  | "calculator"
  | "metadata"
  | "headers"
  | "textContent"
  | "tableData"
> & {
  img?: string;
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

export type ProductTableData = {
  headers: TableRowData[];
  rows: TableRowData[];
  caption?: string;
};

type TableRowData = {
  cells: TableCellData[];
};

type TableCellData = {
  content: React.ReactNode;
  colspan?: number;
  rowspan?: number;
  className?: string;
  style?: React.CSSProperties;
};
