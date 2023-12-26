import { NavLink } from "react-router-dom";

import styles from "./mini-cards.module.scss";

const arrayNames = [
  "Xiaomi",
  "LG",
  "Kitfort",
  "Rondell",
  "Печи и камины",
  "Nino",
];
const arrayOffers = [
  "популярные товары",
  "лучшие предложения",
  "скидки до 30%",
  "подарачная акция",
  "на любой вкус",
  "все для детей",
];

const arrayURL = [
  "/special_offers/xiaomi",
  "/special_offers/LG",
  "/special_offers/kitfort",
  "/special_offers/rondell",
  "/fireplaces",
  "/info/brands/nino",
];

const arrayIMG = [
  "https://cdn21vek.by/img/tmp/b/63d923452e2a9Mi%20Logo%20-%20Xiaomi%20Orange.png",
  "https://cdn21vek.by/img/tmp/b/647758c702c6eScreenshot_6.png",
  "https://cdn21vek.by/img/tmp/b/647861df216dbimage_2023-06-01_12-11-34.png",
  "https://cdn21vek.by/img/tmp/b/6523f784ad985%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D0%BB.png",
  "https://cdn21vek.by/img/tmp/b/6512c6d3e0a86%D0%BA%D0%B0%D0%BC%D0%B8%D0%BD.png",
  "https://cdn21vek.by/img/tmp/b/64b645894de2fybyj.png",
];

function MiniCards() {
  return (
    <div className={styles.home_mini_cards}>
      {arrayURL.map((el, index) => (
        <NavLink to={el} key={index}>
          <div className={styles.card}>
            <img src={arrayIMG[index]} />
            <p>{arrayNames[index]}</p>
            <span>{arrayOffers[index]}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default MiniCards;
