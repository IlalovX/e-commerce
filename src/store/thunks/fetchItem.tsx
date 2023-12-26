import { $host } from "../../services/requestService";

export async function fetchItem({ id }: { id: string }) {
  const res = await $host.get(`/goods/item/${id}`);
  return res.data;
}
