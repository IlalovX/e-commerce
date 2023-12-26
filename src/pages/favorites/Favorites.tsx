import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { useQueries } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "../../utils/helpers/helpers";
import { fetchItem } from "../../store/thunks/fetchItem";
import { getRouteDetail } from "../../routes/getPaths/getPaths";
import { getFavoritesList } from "../../store/slice/favorites";

import {
  useAddCart,
  useDeleteCart,
  useDeleteFavorites,
} from "../../store/services/mutations";

import styles from "./favorites.module.scss";

function Favorites() {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.userInfo.user);
  const favoritesList = useAppSelector(
    (state) => state.favorites.favoritesList
  );

  const queries = useQueries({
    queries: favorites.map((el: string) => {
      return {
        queryKey: ["cartItem", el],
        queryFn: () => fetchItem({ id: el as string }),
        onSuccess: (res: any) => {
          dispatch(getFavoritesList(res));
        },
        refetchOnWindowFocus: false,
      };
    }),
  });

  const addCart = useAddCart();
  const deleteCart = useDeleteCart();
  const deleteFavorites = useDeleteFavorites();

  const handleDeleteFavorites = (cartId: string) => {
    deleteFavorites.mutateAsync({ id: cartId as string });
  };

  const handleAddCart = (cartId: string) => {
    addCart.mutateAsync({ id: cartId });
  };

  const hanleDeleteOnCart = (cartId: string) => {
    deleteCart.mutateAsync({ id: cartId });
  };

  return (
    <div className={styles.favorites}>
      <h1>Избранные товары </h1>
      {favoritesList.length > 0 ? (
        <div className={styles.container}>
          {favoritesList?.map((el) => (
            <div className={styles.card} key={el?.id}>
              <img src={el?.imageUrls[0]} alt="" />
              <div className={styles.text}>
                <NavLink to={getRouteDetail(el?.id)}>{el?.name}</NavLink>
                <p>Рейтинг : {el?.rating}</p>
                <p className={styles.price}>{el?.price} $</p>
                {el?.isInCart ? (
                  <Button
                    type="default"
                    onClick={() => hanleDeleteOnCart(el?.id)}
                  >
                    В корзине
                  </Button>
                ) : (
                  <Button type="default" onClick={() => handleAddCart(el?.id)}>
                    В корзину
                  </Button>
                )}
                <Button
                  type="default"
                  onClick={() => handleDeleteFavorites(el?.id)}
                  className={styles.removeBtn}
                >
                  Удалить из списка
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.voidText}>
          <p>Нет избранных товаров</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
