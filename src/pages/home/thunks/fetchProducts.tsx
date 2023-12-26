import { $host } from "../../../services/requestService";
import { CardType } from "../../../types/CategoryType";

export async function fetchProducts({
  id,
  start,
  count,
  sort,
  reverse,
}: CardType) {
  const { data } = await $host.get(
    `/goods/category/${id}?start=${start}&count=${count}&sortBy=${sort}&reverse=${reverse}`
  );

  return data;
}
