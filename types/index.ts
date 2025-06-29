export type Product = {
  id: string;
  name: string;
  categories: string[];
  airPower: number;
  heatPower: number;
  price: number;
  img: string;
};

export type SelectedProduct = {
  id: string;
  amount: number;
};

export type SelectedProductWithData = Product & { amount: number };
