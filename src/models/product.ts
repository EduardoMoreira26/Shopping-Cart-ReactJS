export interface Product {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface Stock {
  id: string;
  quantity: number;
}
