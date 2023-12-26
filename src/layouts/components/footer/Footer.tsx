import styles from "./footer.module.scss";
import Vk from "../../assets/Vk";
import CaalUs from "../../assets/CallUs";
import Communication from "../../assets/communication";
import Facebook from "../../assets/Facebook";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.contacts}>
        <p>
          <Communication />
          <span>+375 17 302 10 21</span>
        </p>
        <p>
          <img
            src="https://static.21vek.by/desktop/_next/static/images/life.91fa398a.svg"
            alt=""
          />
          <span>+375 17 302 10 21</span>
        </p>
        <p>
          <img
            src="https://static.21vek.by/desktop/_next/static/images/home.8dee0cdf.svg"
            alt=""
          />
          <span>+375 17 302 10 21</span>
        </p>
        <p>
          <img
            src="https://static.21vek.by/desktop/_next/static/images/viber.47679e0e.svg"
            alt=""
          />
          <span>Viber</span>
        </p>
        <p>
          <img
            src="https://static.21vek.by/desktop/_next/static/images/telegram.811b1ccd.svg"
            alt=""
          />
          <span>Telegram</span>
        </p>
        <p>
          <img
            src="https://static.21vek.by/desktop/_next/static/images/email.f751aaaa.svg"
            alt=""
          />
          <span>Почта</span>
        </p>
        <p className={styles.callus_logo}>
          <CaalUs />
          <span>Написать нам</span>
        </p>
      </div>
      <div className={styles.logo__container}>
        <Vk />
        <Facebook />
        <Vk />
        <Vk />
        <Vk />
      </div>
      <div className={styles.text}>
        <p>
          Указанные контакты также являются контактами для связи по вопросам
          обращения покупателей о нарушении их прав. Номер телефона работников
          местных исполнительных и распорядительных органов по месту
          государственной регистрации ООО «Триовист», уполномоченных
          рассматривать обращения покупателей: +375 17 374 01 46. В торговом
          реестре с 23 июня 2010 г., № регистрации 156473, УНП 190806803,
          регистрация №190806803, 22.02.2007, Мингорисполком. © 2004–2023
          21vek.by, Общество с ограниченной ответственностью «Триовист»,
          юр.адрес: 220020, Минск, пр. Победителей, 100, оф. 203 E-mail:
          21@21vek.by
        </p>
      </div>
    </div>
  );
}

export default Footer;
