export interface GetOrderType {
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
  id: string;
  items: [];
}

export interface OrderStateType {
  orderList: GetOrderType[];
}
