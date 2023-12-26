import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Modal, Space } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/register/RegisterForm";
import {
  getRouteCart,
  getRouteFavorites,
  getRouteOrders,
} from "../../../../routes/getPaths/getPaths";

import styles from "./account.module.scss";
import { useGetUserInfo } from "../../../services/queries";

function Account() {
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
  const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);
  const { data } = useGetUserInfo();
  const token = Boolean(localStorage.getItem("token"));

  const showModalLogin = () => {
    setIsModalOpenLogin(true);
  };

  const handleCancelLogin = () => {
    setIsModalOpenLogin(false);
  };
  const showModalRegister = () => {
    setIsModalOpenLogin(false);
    setIsModalOpenRegister(true);
  };

  const handleCancelRegister = () => {
    setIsModalOpenRegister(false);
  };

  const handlePrevent = (e) => {
    e.preventDefault();
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className={styles.avatar}>
          <Avatar icon={<UserOutlined />} size={40} />
          {token ? (
            <div className={styles.user}>
              <p>{data?.firstName as string}</p>
              <p>{data?.lastName as string}</p>
              <Button type="text" onClick={handleLogOut}>
                Выйти
              </Button>
            </div>
          ) : (
            <Button type="text" onClick={showModalLogin}>
              Войти
            </Button>
          )}
        </div>
      ),
      key: "0",
    },
    {
      label: <NavLink to={getRouteCart()}>Корзина</NavLink>,
      key: "1",
    },
    {
      label: <NavLink to={getRouteFavorites()}>Избранные товары</NavLink>,
      key: "2",
    },

    {
      label: <NavLink to={getRouteOrders()}>Ваши заказы</NavLink>,
      key: "3",
    },
  ];

  return (
    <div className={styles.account}>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={handlePrevent} className={styles.drop_link}>
          <Space>
            Аккаунты
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>

      <Modal
        open={isModalOpenLogin}
        footer={[null, null]}
        onCancel={handleCancelLogin}
        className={styles.login}
      >
        <LoginForm
          showModalRegister={showModalRegister}
          handleCancelLogin={handleCancelLogin}
        />
      </Modal>
      <Modal
        open={isModalOpenRegister}
        footer={[null, null]}
        onCancel={handleCancelRegister}
        className={styles.register}
      >
        <RegisterForm handleCancelRegister={handleCancelRegister} />
      </Modal>
    </div>
  );
}

export default Account;
