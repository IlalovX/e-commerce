import { AxiosError } from "axios";
import { ItemType } from "../../types/ItemType";
import { UserOrderDetailType } from "../../types/UserInfoType";

export interface UserInfoSuccessType {
  cart: string[];
  favorites: string[];
  firstName: string;
  lastName: string;
  orders: [
    {
      id: string;
      items: [{ id: string; amount: number | undefined }];
      details: UserOrderDetailType[];
    },
  ];
}

export type UserInfoErrorType = AxiosError<{
  message: { [key: string]: string };
}>;

export interface SearchSuccessType {
  data: ItemType[];
}

export type SearchErrorType = AxiosError<{
  message: { [key: string]: string };
}>;

export interface CategoriesErrorType {
  data: string;
}
