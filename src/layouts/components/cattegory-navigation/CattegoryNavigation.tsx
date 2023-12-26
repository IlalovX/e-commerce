import { NavLink } from "react-router-dom";
import styles from "./category-navigation.module.scss";

function CattegoryNavigation() {
  return (
    <div className={styles.main}>
      <NavLink to="/all-products" className={styles.promo}>
        Все продукты
      </NavLink>
      <NavLink to="">Уценка</NavLink>
      <NavLink to="/appliances/refrigerators">Холодильники</NavLink>
      <NavLink to="/appliances/cookers">Обогреватели</NavLink>
      <NavLink to="/appliances/washing-machines">Стиральные машины</NavLink>
      <NavLink to="/appliances/irons">Утюги</NavLink>
      <NavLink to="/electronics/mobile">Смартфоны</NavLink>
      <NavLink to="/electronics/tvs">Телевизоры</NavLink>
      <NavLink to="/appliances/vacuum">Пылесосы</NavLink>
      <NavLink to="/furniture/beds">Кровати</NavLink>
      <NavLink to="/furniture/sofas">Диваны</NavLink>
    </div>
  );
}

export default CattegoryNavigation;
