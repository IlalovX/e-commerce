import { ItemType } from "./ItemType";

export interface CartStateType {
  cartsList: ItemType[];
  price: number;
  count: number;
  items: {
    id?: string;
    amount?: number | undefined;
  }[];
}
