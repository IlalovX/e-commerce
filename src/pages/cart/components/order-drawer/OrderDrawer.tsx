import { Button, Drawer } from "antd";
import { useState } from "react";

import FormOrder from "./components/FormOrder";

import styles from "./order-drawer.module.scss";

function OrderDrawer() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="default" onClick={showDrawer} className={styles.button}>
        Оформить заказ
      </Button>
      <Drawer
        placement="bottom"
        closable
        onClose={onClose}
        open={open}
        size="large"
      >
        <div className={styles.drawer}>
          <img
            src="https://cdn21vek.by/img/checkout/checkout-presenation-1.png"
            alt=""
          />
          <div className={styles.drawer_body}>
            <h1>Заполните форму</h1>
            <FormOrder onClose={onClose} />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default OrderDrawer;
