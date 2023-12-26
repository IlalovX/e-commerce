import { useMutation } from "@tanstack/react-query";
import { $authHost } from "../../services/requestService";

export function useAddCart() {
  return useMutation(async (data: { id: string }) => {
    const res = $authHost.post("/users/cart", data);
    return res;
  });
}
export function useDeleteCart() {
  return useMutation(async ({ id }: { id: string }) => {
    const res = $authHost.delete(`/users/cart?id=${id}`);

    return res;
  });
}

export function useAddFavorites() {
  return useMutation(async (data: { id: string }) => {
    const res = $authHost.post("/users/favorites", data);
    return res;
  });
}

export function useDeleteFavorites() {
  return useMutation(async ({ id }: { id: string }) => {
    const res = $authHost.delete(`/users/favorites?id=${id}`);
    return res;
  });
}
