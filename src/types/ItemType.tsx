export interface ItemType {
  id: string;
  name: string;
  imageUrls: string[];
  rating: number;
  price: number;
  availableAmount: number;
  description: string;
  isInCart: boolean;
  isFavorite: boolean;
  category: string;
  subCategory: string;
  amount?: number | undefined;
}
