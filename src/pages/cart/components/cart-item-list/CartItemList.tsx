import { Button } from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/helpers/helpers";
import { fetchItem } from "../../../../store/thunks/fetchItem";
import {
  getCartsList,
  setDecrementAmountOrder,
  setIncrementAmountOrder,
} from "../../../../store/slice/cart";

import { useQueries } from "@tanstack/react-query";
import {
  useAddFavorites,
  useDeleteCart,
} from "../../../../store/services/mutations";
import { ItemType } from "../../../../types/ItemType";

import styles from "./cart-item-list.module.scss";

function ItemsList() {
  const [disableBtn, setDisableBtn] = useState(true);
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cart.cartsList);
  const { cart } = useAppSelector((state) => state.userInfo.user);

  const queries = useQueries({
    queries: cart?.map((el: string) => {
      return {
        queryKey: ["cartItem", el, cart],
        queryFn: () => fetchItem({ id: el as string }),
        onSuccess: (res: ItemType) => {
          dispatch(getCartsList(res));
        },
        refetchOnWindowFocus: false,
      };
    }),
  });

  const fetchDecrement = (id: string) => {
    dispatch(setDecrementAmountOrder(id));
  };
  const fetchIncrement = (id: string) => {
    dispatch(setIncrementAmountOrder(id));
    setDisableBtn(false);
  };
  const fetchDeleteCart = (id: string) => {
    useDeleteCart().mutateAsync({ id: id });
  };
  const fetchAddFavorites = (id: string) => {
    useAddFavorites().mutateAsync({ id: id });
  };

  return (
    <div className={styles.item}>
      {cards?.map((el) => (
        <div className={styles.main} key={el?.id}>
          <img src={el?.imageUrls[0]} alt="" />
          <div className={styles.aside}>
            <div className={styles.container}>
              <div className={styles.text}>
                <h1>{el?.name}</h1>
                <span>код товара 7.345.083</span>
              </div>
              <div className={styles.btns}>
                <button
                  onClick={() => fetchDecrement(el?.id)}
                  disabled={disableBtn}
                >
                  -
                </button>
                <p className={styles.count}>{el?.amount}</p>
                <button onClick={() => fetchIncrement(el?.id)}>+</button>
              </div>
              <div className={styles.price}>
                <span className={styles.bonus}>20 $</span>
                <p>{el?.price} $</p>
              </div>
            </div>
            <div className={styles.fetchBtns}>
              <Button
                type="text"
                className={styles.btn_delete}
                onClick={() => fetchDeleteCart(el?.id)}
              >
                <DeleteOutlined />
                Удалить
              </Button>
              <Button
                type="text"
                className={styles.btn_favorite}
                onClick={() => fetchAddFavorites(el?.id)}
              >
                <HeartOutlined />В избранное
              </Button>
              <hr />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsList;
