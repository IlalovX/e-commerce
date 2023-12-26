import { useQuery } from "@tanstack/react-query";
import { $host } from "../../../services/requestService";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../utils/helpers/helpers";
import { getArraySubCards } from "../../../store/slice/subCards";
import {
  SetSubCategoryType,
  SubCategoryErrorType,
} from "../types/queriesTypes";
import { ItemType } from "../../../types/ItemType";

export function useGetSubCards({
  start,
  count,
  sort,
  reverse,
}: SetSubCategoryType) {
  const { categoryId, subCategoryId } = useParams();
  const dispatch = useAppDispatch();
  return useQuery<ItemType[], SubCategoryErrorType>(
    ["getSearchProducts", categoryId, subCategoryId],
    async () => {
      const res = await $host.get(
        `/goods/category/${categoryId}/${subCategoryId}?start=${start}&count=${count}&sortBy=${sort}&reverse=${reverse}`
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        dispatch(getArraySubCards(res));
      },
    }
  );
}
