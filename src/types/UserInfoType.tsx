export interface UserInfoPayloadType {
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
export interface UserOrderDetailType {
  name: string;
  address: string;
  phone: string;
  timeToDeliver: string;
  comment?: string;
}
export interface UserStateType {
  user: UserInfoPayloadType;
}
