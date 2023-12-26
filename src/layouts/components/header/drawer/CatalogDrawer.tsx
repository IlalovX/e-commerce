import { Button, Drawer } from "antd";
import { useState } from "react";

import { getRouteSubCategory } from "../../../../routes/getPaths/getPaths";
import { NavLink } from "react-router-dom";
import { useGetCategories } from "../../../services/queries";
import {
  CategoriesType,
  SubCategoryType,
} from "../../../../types/CategoryType";

import styles from "./catalog-drawer.module.scss";

function DrawerBtn() {
  const [open, setOpen] = useState(false);
  const { data } = useGetCategories();

  const [currentCategoryName, setCurrentCategoryName] = useState("Appliances");
  const [currentCategoryID, setCurrentCategoryID] = useState("appliances");

  let getSubCategoriesArray: SubCategoryType[] = [];
  if (data) {
    data?.map((el: CategoriesType) => {
      if (el.name === currentCategoryName) {
        getSubCategoriesArray = el.subCategories;
      }
    });
  }

  const onClickCategory = (name: string, id: string) => {
    setCurrentCategoryName(name);
    setCurrentCategoryID(id);
  };

  const status = (name: string) => {
    if (currentCategoryName === name) {
      return true;
    } else {
      false;
    }
  };

  const showDrawer = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.headDrawer}>
      <Button
        type="text"
        onClick={showDrawer}
        className={open ? styles.drawerBtnClose : styles.drawerBtnActive}
      >
        {!open ? (
          <div className={styles.circle}>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
          </div>
        ) : (
          <p className={styles.drawer__close}>X</p>
        )}

        <p>Каталог</p>
      </Button>
      <div className={styles.drawer_container}>
        <Drawer
          className={styles.drawer}
          placement="top"
          closable={false}
          getContainer={false}
          onClose={onClose}
          open={open}
        >
          <div className={styles.categories}>
            {data?.map(({ id, name }: { id: string; name: string }) => (
              <Button
                type="text"
                className={
                  status(name)
                    ? `${styles.category} ${styles.categoryActive}`
                    : `${styles.category}`
                }
                onClick={() => {
                  onClickCategory(name, id);
                }}
                key={id}
              >
                {name}
              </Button>
            ))}
          </div>
          <div className={styles.subCategories}>
            {getSubCategoriesArray.map(
              ({ id, name }: { id: string; name: string }) => (
                <NavLink
                  to={getRouteSubCategory(currentCategoryID, id)}
                  className={styles.subCategory}
                  key={id}
                  onClick={onClose}
                >
                  {name}
                </NavLink>
              )
            )}
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default DrawerBtn;
