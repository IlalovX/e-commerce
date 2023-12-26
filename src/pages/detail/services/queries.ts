import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchItem } from "../../../store/thunks/fetchItem";
import { ItemType } from "../../../types/ItemType";
import { DetailErrorType } from "../types/queriesTypes";

export function useGetDetailProducts() {
  const { itemId } = useParams();
  return useQuery<ItemType, DetailErrorType>({
    queryKey: ["getProducts", itemId],
    queryFn: () => {
      return fetchItem({ id: itemId as string });
    },
    refetchOnWindowFocus: false,
    enabled: !!itemId,
  });
}
