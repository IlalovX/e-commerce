import { Dropdown, MenuProps, Space } from "antd";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import styles from "./contact-items.module.scss";

function contactItems() {
  const items: MenuProps["items"] = [
    {
      label: "+375 29 302 10 21",
      key: "0",
    },
    {
      label: <NavLink to="">Telegram</NavLink>,
      key: "1",
    },
    {
      label: <NavLink to="">Почта</NavLink>,
      key: "2",
    },
    {
      label: <p className={styles.btn__modal}>Заказать Звонок</p>,
      key: "3",
    },
    {
      label: <p className={styles.btn__modal}>Написать нам</p>,
      key: "4",
    },
    {
      label: <NavLink to="">Контакты</NavLink>,
      key: "5",
    },
  ];

  const handlePrevent = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.contact}>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={handlePrevent}>
          <Space>
            Ещё
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default contactItems;
