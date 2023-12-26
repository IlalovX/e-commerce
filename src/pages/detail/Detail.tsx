import { Button } from "antd";

import { useGetDetailProducts } from "./services/queries";
import {
  useAddCart,
  useAddFavorites,
  useDeleteCart,
  useDeleteFavorites,
} from "../../store/services/mutations";

import styles from "./detail.module.scss";

function Detail() {
  const { data } = useGetDetailProducts();

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
      {data && (
        <div className={styles.item}>
          <h1>{data?.name}</h1>
          <header className={styles.flex}>
            <p> Рейтинг : {data?.rating}</p>
            {data?.isFavorite ? (
              <Button
                type="text"
                className={styles.likesBtn}
                onClick={() => handleDeleteFavorites(data?.id)}
                loading={deleteFavorites.isLoading}
              >
                Удалить из избранного
              </Button>
            ) : (
              <Button
                type="text"
                className={styles.likesBtn}
                onClick={() => handleAddFavorites(data?.id)}
                loading={addFavorites.isLoading}
              >
                Добавить в избранное
              </Button>
            )}
          </header>
          <main className={styles.flex + " " + styles.body}>
            <img src={data?.imageUrls[0]} />
            <div className={styles.text}>
              <div className={styles.flex + " " + styles.text_header}>
                <h2>{data?.price} $</h2>
                {data?.isInCart ? (
                  <Button
                    type="link"
                    className={styles.cartLink}
                    onClick={() => hanleDeleteOnCart(data?.id)}
                    loading={deleteCart.isLoading}
                  >
                    В корзине
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    className={styles.cartAdd}
                    onClick={() => handleAddCart(data?.id)}
                    loading={addCart.isLoading}
                  >
                    В корзину
                  </Button>
                )}
              </div>
              <p className={styles.monthPrice}>
                от {pricePerMonth(data.price)} $/месяц при оплате по частями
              </p>
              <span className={styles.amount}>
                {(data?.availableAmount as number) > 0
                  ? "В наличии"
                  : "Нет в наличии"}
              </span>
              <hr />
              <p className={styles.description}>{data?.description}</p>
              <hr />
              <p className={styles.surety}>Гарантия 1 год</p>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default Detail;
