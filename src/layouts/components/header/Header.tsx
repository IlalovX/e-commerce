import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

import ContactItems from "./contact-items/ContactItems";
import Account from "./account/Account";
import Search from "./search/Search";
import Drawer from "./drawer/CatalogDrawer";
import { getRouteCart, getRouteMain } from "../../../routes/getPaths/getPaths";

import styles from "./Header.module.scss";
import Viber from "../../assets/viber";
import Communication from "../../assets/communication";

const items: MenuProps["items"] = [
  {
    label: <NavLink to="">Оплата</NavLink>,
    key: "0",
  },
  {
    label: <NavLink to="">Доставка</NavLink>,
    key: "1",
  },
  {
    label: <NavLink to="">Самовызов</NavLink>,
    key: "2",
  },
];

const handlePrevent = (e) => {
  e.preventDefault();
};

function Header() {
  return (
    <div className={styles.main}>
      <header>
        <p className={styles.btn__modal}>г. Минск</p>
        <div className={styles.special__offers}>
          <NavLink to="">Оплата Частями</NavLink>
          <NavLink to="">Бонусная программа</NavLink>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={handlePrevent}>
              <Space>
                Ещё
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <p className={styles.viber_logo}>
            <Viber />
            <span>Viber</span>
          </p>
          <p className={styles.communication}>
            <Communication />
            <span>+375 29 302 10 21</span>
          </p>
          <ContactItems />
          <div className={styles.schedule}>
            <p>контакты-центр</p>
            <p>с 8:00 до 22:00</p>
          </div>
        </div>
      </header>
      <nav>
        <NavLink to={getRouteMain()} className={styles.logo}>
          21VEK.BY
        </NavLink>
        <Drawer />
        <Search />
        <Account />
        <NavLink to={getRouteCart()} className={styles.orderBtn}>
          <ShoppingCartOutlined /> Корзина
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
