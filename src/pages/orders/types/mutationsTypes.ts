import { AxiosError } from "axios";

export interface ChangeOrderDataType {
  id: string;
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
}

export interface ChangeOrderSuccessType {}

export type ChangeOrderErrorType = AxiosError<{
  message: { [key: string]: string };
}>;

export interface DeleteOrderDataType {
  id: string;
}

export interface DeleteOrderSuccesType {}

export type DeleteOrderErrorType = AxiosError<{
  message: { [key: string]: string };
}>;
