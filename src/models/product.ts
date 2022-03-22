export interface Product {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  priceTags: [
    {
      value: number;
      rawValue: number;
      isPercentual: false;
    }
  ];
}
