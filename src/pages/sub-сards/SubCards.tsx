import { Button } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

import Filters from "./components/sub-cards-filter/FiltersSubCards";
import { ItemType } from "../../types/ItemType";

import { getRouteDetail } from "../../routes/getPaths/getPaths";
import {
  useAddCart,
  useAddFavorites,
  useDeleteCart,
  useDeleteFavorites,
} from "../../store/services/mutations";
import { useGetSubCards } from "./services/quaries";
import { useAppSelector } from "../../utils/helpers/helpers";

import styles from "./sub-cards.module.scss";

function SubCardsList() {
  const getSubCards = useGetSubCards({
    start: 0,
    count: 0,
    sort: "",
    reverse: false,
  });

  const arr = useAppSelector((state) => state.subCards.subCardArray);

  const addCart = useAddCart();
  const deleteCart = useDeleteCart();
  const deleteFavorites = useDeleteFavorites();
  const addFavorites = useAddFavorites();

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
  const pricePerMonth = (price: number) => {
    return (price / 12).toFixed(2);
  };
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {arr?.map((el: ItemType) => (
          <div key={el?.id} className={styles.card}>
            <Button
              type="link"
              href={getRouteDetail(el?.id)}
              className={styles.imgBtn}
            >
              <img src={el?.imageUrls[0]} alt="" />
            </Button>
            <p className={styles.rating}>Рейтинг : {el?.rating}</p>
            <p className={styles.name}>{el?.name}</p>
            <p className={styles.price}>
              Цена: <span>{el?.price} $</span>
            </p>
            <span className={styles.monthPrice}>
              в месяц {pricePerMonth(el?.price)} $/месяц
            </span>
            {!el?.isFavorite ? (
              <Button
                onClick={() => handleAddFavorites(el?.id)}
                className={styles.like}
                loading={addFavorites.isLoading}
              >
                <HeartOutlined />
              </Button>
            ) : (
              <Button
                onClick={() => handleDeleteFavorites(el?.id)}
                className={styles.like}
                loading={deleteFavorites.isLoading}
              >
                <HeartFilled />
              </Button>
            )}

            {el?.isInCart ? (
              <Button
                className={styles.cart}
                onClick={() => hanleDeleteOnCart(el?.id)}
                loading={deleteCart.isLoading}
              >
                В корзине
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => handleAddCart(el?.id)}
                className={styles.cart}
                loading={addCart.isLoading}
              >
                В корзину
              </Button>
            )}
          </div>
        ))}
      </div>
      <Filters />
    </div>
  );
}

export default SubCardsList;
