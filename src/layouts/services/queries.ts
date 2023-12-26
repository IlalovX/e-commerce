import { useQuery } from "@tanstack/react-query";
import { $authHost, $host } from "../../services/requestService";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../utils/helpers/helpers";
import { getCatalogObject } from "../../store/slice/catalog";
import { getUserInfoObject } from "../../store/slice/userInfo";
import {
  CategoriesErrorType,
  SearchErrorType,
  SearchSuccessType,
  UserInfoErrorType,
  UserInfoSuccessType,
} from "../types/queriesTypes";
import { CategoriesType } from "../../types/CategoryType";

export function useGetUserInfo() {
  const dispatch = useAppDispatch();
  return useQuery<UserInfoSuccessType, UserInfoErrorType>(
    ["getUserInfo"],
    async () => {
      const res = await $authHost.get("/users/userInfo");
      return res.data;
    },
    {
      onSuccess: (res) => {
        dispatch(getUserInfoObject(res));
      },

      refetchOnWindowFocus: false,
    }
  );
}

export function useGetSearchProducts() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  return useQuery<SearchSuccessType, SearchErrorType>(
    ["getSearchProducts", search],
    async () => {
      const res = await $host.get(`/goods/search?text=${search}`);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!search,
    }
  );
}

export function useGetCategories() {
  const dispatch = useAppDispatch();
  return useQuery<CategoriesType, CategoriesErrorType>(
    ["getCategories"],
    async () => {
      const res = await $host.get("/categories");
      return res.data;
    },
    {
      onSuccess: (res) => {
        dispatch(getCatalogObject(res));
      },

      refetchOnWindowFocus: false,
    }
  );
}
