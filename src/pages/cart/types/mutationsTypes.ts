import { AxiosError } from "axios";

export interface OrderDataType {
  items: [{ id: string; amount: number | undefined }];
  name: string;
  address: string;
  phone: string;
  timeToDeliver: string;
  comment: string;
}
export interface OrderSuccesType {
  data: string;
}

export type OrderErrorType = AxiosError<{ message: { [key: string]: string } }>;
