import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Carousel } from "antd";

import left from "../../assets/icons8-left-arrow-100.png";
import right from "../../assets/icons8-right-arrow-100.png";

import styles from "./swipper.module.scss";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <RightCircleOutlined
      className={className}
      onClick={onClick}
      style={{
        ...style,
        backgroundImage: `url(${right})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "60px",
        width: "60px",
        zIndex: "2",
        right: "40px",
      }}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <LeftCircleOutlined
      className={className}
      onClick={onClick}
      style={{
        ...style,
        backgroundImage: `url(${left})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "60px",
        width: "60px",
        zIndex: "2",
        left: "40px",
      }}
    />
  );
}

const settings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const arrayImg = [
  "https://cdn21vek.by/img/tmp/b/6523f72bc3bc11920%D1%85634.jpg",
  "https://cdn21vek.by/img/tmp/b/650981e5b8bfa1920x634-%D1%81%D1%82%D0%B8%D1%80%D0%B0%D0%BB%D0%BA%D0%B0.jpg",
  "https://cdn21vek.by/img/tmp/b/651addd15ea881920x634-lg-%D1%81%D1%82%D0%B8%D1%80%D0%BA%D0%B0.jpg",
  "https://cdn21vek.by/img/tmp/b/64e4760b8d5931920%D1%85634_%D0%AD%D0%9E%D0%A1.jpg",
  "https://cdn21vek.by/img/tmp/b/651c2faae44681920%D1%85634_%D0%BF%D0%B0%D1%80%D1%84%D1%8E%D0%BC%D0%B5%D1%80%D0%B8%D1%8F.jpg",
  "https://cdn21vek.by/img/tmp/b/651bc9ab999671920x634_Beko-%D1%85%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA.jpg",
];

function Swipper() {
  return (
    <div className={styles.swipper}>
      <Carousel arrows {...settings} autoplay>
        {arrayImg?.map((el) => (
          <img src={el} className={styles.card} key={el} />
        ))}
      </Carousel>
    </div>
  );
}

export default Swipper;
