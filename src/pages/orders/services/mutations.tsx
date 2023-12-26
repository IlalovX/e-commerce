import { useMutation } from "@tanstack/react-query";
import { $authHost } from "../../../services/requestService";
import {
  ChangeOrderDataType,
  ChangeOrderErrorType,
  ChangeOrderSuccessType,
  DeleteOrderDataType,
  DeleteOrderErrorType,
  DeleteOrderSuccesType,
} from "../types/mutationsTypes";

export function useChangeOrder() {
  return useMutation<
    ChangeOrderSuccessType,
    ChangeOrderErrorType,
    ChangeOrderDataType
  >(async (data) => {
    const res = await $authHost.put("/users/order", data);
    return res.data;
  });
}
export function useDeleteOrder() {
  return useMutation<
    DeleteOrderSuccesType,
    DeleteOrderErrorType,
    DeleteOrderDataType
  >(async (data) => {
    const res = await $authHost.delete(`/users/order?id=${data.id}`);
    return res.data;
  });
}
