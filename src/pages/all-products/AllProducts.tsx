import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../utils/helpers/helpers";
import { CategoriesType } from "../../types/CategoryType";
import { fetchProducts } from "../home/thunks/fetchProducts";
import { getScrollArray } from "../../store/slice/products";
import { getRouteDetail } from "../../routes/getPaths/getPaths";
import {
  useAddCart,
  useAddFavorites,
  useDeleteCart,
  useDeleteFavorites,
} from "../../store/services/mutations";
import { ItemType } from "../../types/ItemType";

import styles from "./all-products.module.scss";

function AllProducts() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.catalog.obj);
  const scrollArray = useAppSelector(
    (state) => state.products.scrollArrayContainer
  );

  let [count, setCount] = useState<number>(0);
  const [refetching, setRefetching] = useState<boolean>(true);

  const addCart = useAddCart();
  const deleteCart = useDeleteCart();
  const deleteFavorites = useDeleteFavorites();
  const addFavorites = useAddFavorites();

  const queriesScroll = useQueries({
    queries: categories?.map((category: CategoriesType) => {
      return {
        queryKey: ["getProduct", category.id, count],
        queryFn: () =>
          fetchProducts({
            id: category.id,
            start: count,
            count: count + 5,
            reverse: false,
            sort: "",
          }),
        onSuccess: (res: ItemType) => {
          setRefetching(false);
          dispatch(getScrollArray(res));
        },
        onError: () => {
          setRefetching(false);
        },
        refetch: false,
        refetchOnWindowFocus: false,
        enabled: refetching,
      };
    }),
  });

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setCount((count += 5));
      setRefetching(true);
    }
  };

  const handleAddFavorites = (cartId: string) => {
    addFavorites.mutateAsync({ id: cartId });
  };

  const handleDeleteFavorites = (cartId: string) => {
    deleteFavorites.mutateAsync({ id: cartId as string });
  };

  const handleAddCart = (cartId: string) => {
    addCart.mutateAsync({ id: cartId });
  };

  const hanleDeleteOnCart = (cartId: string) => {
    deleteCart.mutateAsync({ id: cartId });
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className={styles.all_products}>
      <h1>Наши Продукции:</h1>
      <div className={styles.scroll_container}>
        {scrollArray.map((el) => (
          <div className={styles.card}>
            <NavLink to={getRouteDetail(el?.id)} className={styles.imgBtn}>
              <img src={el?.imageUrls[0]} />
            </NavLink>
            <p className={styles.rating}>рейтинг : {el?.rating}</p>
            <p className={styles.name}>{el?.name}</p>
            <p className={styles.price}>Цена : {el?.price} $</p>
            {el?.isInCart ? (
              <Button
                type="primary"
                className={styles.btn}
                onClick={() => hanleDeleteOnCart(el?.id)}
              >
                В корзинe
              </Button>
            ) : (
              <Button
                type="primary"
                className={styles.btn}
                onClick={() => handleAddCart(el?.id)}
              >
                В корзинy
              </Button>
            )}

            {!el?.isFavorite ? (
              <Button
                onClick={() => handleAddFavorites(el?.id)}
                className={styles.like}
              >
                <HeartOutlined />
              </Button>
            ) : (
              <Button
                onClick={() => handleDeleteFavorites(el?.id)}
                className={styles.like}
              >
                <HeartFilled />
              </Button>
            )}
          </div>
        ))}
      </div>
      {refetching && (
        <div className={styles.loading}>
          <p>Загружается</p>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
