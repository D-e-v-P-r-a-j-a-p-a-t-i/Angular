import { Product } from "./Product";

export interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
}
