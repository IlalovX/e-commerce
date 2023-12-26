import { useAppSelector } from "../../../../utils/helpers/helpers";

import OrderDrawer from "../order-drawer/OrderDrawer";

import styles from "./order.module.scss";

function Order() {
  const price = useAppSelector((state) => state.cart.price);
  const count = useAppSelector((state) => state.cart.count);

  const fixedPrice = () => {
    return price.toFixed(2);
  };

  return (
    <div className={styles.main}>
      <header>
        <p>Итого </p>
        <p>{!Number.isNaN(price) && price > 0 ? fixedPrice() : 0} $</p>
      </header>
      <div className={styles.details}>
        <p className={styles.count}>
          <span>Товары - {count} шт.</span>
          <span className={styles.price}>{fixedPrice()} $</span>
        </p>
      </div>
      <div className={styles.balls}>
        <h3>от 1,34 бонусных баллов</h3>
        <p>на следующие покупки</p>
      </div>
      <OrderDrawer />
      <div className={styles.comments}>
        <p>
          * Способ и время доставки можно выбрать <br /> при оформлении заказа.
          Дата доставки заказа рассчитывается по максимальной дате доставки
          товаров в корзине.
        </p>
      </div>
    </div>
  );
}

export default Order;
