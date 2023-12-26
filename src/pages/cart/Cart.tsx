import ItemsList from "./components/cart-item-list/CartItemList";
import Order from "./components/order/Order";

import styles from "./cart.module.scss";

function Cart() {
  return (
    <div className={styles.main}>
      <ItemsList />
      <Order />
    </div>
  );
}

export default Cart;
