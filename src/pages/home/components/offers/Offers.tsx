import styles from "./offers.module.scss";

const offersArray = [
  "Более 90 пунктов самовывоза",
  "Доставка в любую точку Беларуси",
  "Оплата частями",
  "Бонусная программа",
  "Подарочные сертификаты",
];
const textArray = [
  "Получите заказ в кратчайшие сроки",
  "Заказывайте товары прямо к себе домой",
  "Покупайте больше сейчас платите частями",
  "Накапливайте бонусные баллы и оплачивайте ими покупки",
  "Подарите сертификаты вашим близким",
];
const imgArray = [
  "https://static.21vek.by/desktop/_next/static/images/pickupPoints3x.76c12c04.png",
  "https://static.21vek.by/desktop/_next/static/images/delivery3x.f7100d09.png",
  "https://static.21vek.by/desktop/_next/static/images/installmentPayment3x.ae6544a2.png",
  "https://static.21vek.by/desktop/_next/static/images/bonusProgram3x.018082c4.png",
  "https://static.21vek.by/desktop/_next/static/images/giftCertificates3x.b62a541c.png",
];

function Offers() {
  return (
    <div className={styles.home__offers}>
      <h1>Предложения</h1>
      <div className={styles.container}>
        {offersArray.map((el, index) => (
          <div className={styles.card} key={el}>
            <p>{el}</p>
            <span>{textArray[index]}</span>
            <img src={imgArray[index]} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
