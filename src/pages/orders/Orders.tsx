import { useState } from "react";
import { Button, Dropdown, MenuProps, Modal, Space } from "antd";

import { useAppSelector } from "../../utils/helpers/helpers";
import FormChangeOrder from "./components/form-change/FormChangeOrder";
import {
  useAddCart,
  useAddFavorites,
  useDeleteCart,
  useDeleteFavorites,
} from "../../store/services/mutations";
import { useQueries } from "@tanstack/react-query";
import { fetchItem } from "../../store/thunks/fetchItem";
import { useDeleteOrder } from "./services/mutations";
import { GetOrderType } from "../../types/OrderType";

import styles from "./orders.module.scss";

function Orders() {
  const { orders } = useAppSelector((state) => state.userInfo.user);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");
  let arrayOrders: GetOrderType[] = [];
  let queriesContainer: any = [];

  arrayOrders = orders?.map((order: any) => {
    queriesContainer = useQueries({
      queries: order.items.map((item: any) => {
        return {
          queryKey: [item.id],
          queryFn: () => fetchItem({ id: item.id }),
          refetchOnWindowFocus: false,
        };
      }),
    });

    const container = queriesContainer.map(({ data }: { data: any }) => {
      if (data !== undefined) {
        return data;
      }
    });
    return { id: order.id, detail: order.details, items: container };
  });

  const addCart = useAddCart();
  const deleteCart = useDeleteCart();
  const deleteFavorites = useDeleteFavorites();
  const addFavorites = useAddFavorites();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    useDeleteOrder().mutateAsync({ id: itemId as string });
  };

  const hanldeClickEdit = (e, id: string) => {
    e.preventDefault();
    setItemId(id);
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

  const items: MenuProps["items"] = [
    {
      label: (
        <Button type="text" onClick={showModal} className={styles.modal_btn}>
          Изменить
        </Button>
      ),
      key: "0",
    },
    {
      label: (
        <Button type="text" className={styles.delete} onClick={handleDelete}>
          Удалить
        </Button>
      ),
      key: "1",
    },
  ];

  return (
    <div className={styles.OrderList}>
      {arrayOrders.length > 0 &&
        arrayOrders.map((el) => {
          return (
            <div className={styles.card} key={el?.id}>
              <div className={styles.drop_container}>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  className={styles.dropdown}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                >
                  <a
                    onClick={(e) => {
                      hanldeClickEdit(e, el?.id);
                    }}
                  >
                    <Space className={styles.drop}>
                      <p className={styles.top_dot + " " + styles.dot}></p>
                      <p className={styles.mid_dot + " " + styles.dot}></p>
                      <p className={styles.bot_dot + " " + styles.dot}></p>
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className={styles.table}>
                <div className={styles.table_details}>
                  <p>
                    <span>Name :</span> {el.detail.name}
                  </p>
                  <p>
                    <span>Address :</span> {el.detail.address}
                  </p>
                  <p>
                    <span>Phone :</span> +{el.detail.phone}
                  </p>
                  <p>
                    <span>Time :</span> {el.detail.timeToDeliver}
                  </p>
                </div>
                <p className={styles.header_list}>Items</p>
                <table className={styles.table_list}>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Rating</th>
                  </tr>
                  {el?.items?.map((item: ItemType) => (
                    <tr className={styles.item}>
                      <td>{item?.name}</td>
                      <th>{item?.price} $</th>
                      <th>{item?.rating}</th>
                      <td className={styles.item_btns}>
                        {item?.isInCart ? (
                          <Button
                            className={styles.cart_btn}
                            onClick={() => hanleDeleteOnCart(item?.id)}
                          >
                            В корзине
                          </Button>
                        ) : (
                          <Button
                            className={styles.cart_btn}
                            onClick={() => handleAddCart(item?.id)}
                          >
                            В корзину
                          </Button>
                        )}
                        {item?.isFavorite ? (
                          <Button
                            className={styles.like_btn}
                            onClick={() => handleDeleteFavorites(item?.id)}
                          >
                            Удалить из избранного
                          </Button>
                        ) : (
                          <Button
                            className={styles.like_btn}
                            onClick={() => handleAddFavorites(item?.id)}
                          >
                            В избранное
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          );
        })}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[null, null]}
      >
        <div className={styles.modal_body}>
          <h1>Заполните форму</h1>
          <FormChangeOrder id={itemId} handleClose={handleCancel} />
        </div>
      </Modal>
    </div>
  );
}

export default Orders;
