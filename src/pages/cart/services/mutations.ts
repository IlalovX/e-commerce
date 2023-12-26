import { useMutation } from "@tanstack/react-query";
import { $authHost } from "../../../services/requestService";
import {
  OrderDataType,
  OrderErrorType,
  OrderSuccesType,
} from "../types/mutationsTypes";

export function useSetOrder() {
  return useMutation<OrderSuccesType, OrderErrorType, OrderDataType>(
    async (data) => {
      const res = await $authHost.post("/users/order", data);
      return res;
    }
  );
}
