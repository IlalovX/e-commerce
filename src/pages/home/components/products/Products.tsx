import { useState } from "react";
import { Button, Carousel, Radio } from "antd";
import { useQueries } from "@tanstack/react-query";
import {
  HeartFilled,
  HeartOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { NavLink, useSearchParams } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/helpers/helpers";
import {
  getProducts,
  setSortAscendingCards,
  setSortDescendingCards,
  setSortPopularCards,
} from "../../../../store/slice/products";
import { fetchProducts } from "../../thunks/fetchProducts";
import { getRouteDetail } from "../../../../routes/getPaths/getPaths";
import left from "../../assets/icons8-left-arrow-100.png";
import right from "../../assets/icons8-right-arrow-100.png";
import { CategoriesType } from "../../../../types/CategoryType";
import {
  useAddCart,
  useAddFavorites,
  useDeleteCart,
  useDeleteFavorites,
} from "../../../../store/services/mutations";

import styles from "./products.module.scss";

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
        height: "50px",
        width: "50px",
        right: "-80px",
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
        height: "50px",
        width: "50px",
        left: "-80px",
      }}
    />
  );
}

const settings = {
  dots: false,
  slidesToShow: 5,
  slidesToScroll: 5,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState("");
  const start = searchParams.get("start");
  const categories = useAppSelector((state) => state.catalog.obj);
  const cards = useAppSelector((state) => state.products.cards);

  const addCart = useAddCart();
  const deleteCart = useDeleteCart();
  const deleteFavorites = useDeleteFavorites();
  const addFavorites = useAddFavorites();

  const queriesProducts = useQueries({
    queries: categories?.map((category: CategoriesType) => {
      return {
        queryKey: ["getProduct", category.id, start],
        queryFn: () =>
          fetchProducts({
            id: category.id,
            start: +(start as string),
            count: +(start as string) + 10,
            reverse: false,
            sort: "",
          }),
        onSuccess: (res: any) => {
          dispatch(getProducts(res));
        },
        refetch: false,
        refetchOnWindowFocus: false,
        enabled: !!categories,
      };
    }),
  });

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };
  const handleDescending = () => {
    dispatch(setSortDescendingCards());
  };
  const handleAscending = () => {
    dispatch(setSortAscendingCards());
  };
  const handlePopular = () => {
    dispatch(setSortPopularCards());
  };
  const handleMore = () => {
    setSearchParams((prev) => {
      prev.set("start", String((+(start as string) ?? "10") + 10));
      return prev;
    });
  };

  const handleAddFavorites = (cartId: string) => {
    addFavorites.mutateAsync({ id: cartId });
  };

  const handleDeleteFavorites = (cartId: string) => {
    deleteFavorites.mutateAsync({ id: cartId as string });
  };

  const handleAddCart = (cartId: string) => {
    addCart.mutateAsync({ id: cartId });
  };

  const hanleDeleteOnCart = (cartId: string) => {
    deleteCart.mutateAsync({ id: cartId });
  };

  return (
    <div className={styles.products}>
      <h1>Продукты</h1>
      <div className={styles.btns}>
        <Radio.Group value={filter} onChange={handleChangeFilter}>
          <Radio.Button
            value="popular"
            onClick={handlePopular}
            className={styles.filter_btn}
          >
            По популярности
          </Radio.Button>
          <Radio.Button
            value="desceding"
            className={styles.filter_btn}
            onClick={handleDescending}
          >
            По убыванию
          </Radio.Button>
          <Radio.Button
            value="asceding"
            className={styles.filter_btn}
            onClick={handleAscending}
          >
            По возрастанию
          </Radio.Button>
        </Radio.Group>
        <Button className={styles.more} type="text" onClick={handleMore}>
          Показать ещё
        </Button>
      </div>
      <div className={styles.container}>
        <Carousel arrows {...settings}>
          {cards?.map((el) => (
            <div className={styles.card} key={el?.id}>
              <NavLink to={getRouteDetail(el?.id)} className={styles.imgBtn}>
                <img src={el.imageUrls[0]} />
              </NavLink>
              <p className={styles.rating}>рейтинг : {el?.rating}</p>
              <p className={styles.name}>{el?.name}</p>
              <p className={styles.price}>Цена : {el?.price} $</p>
              {el?.isInCart ? (
                <Button
                  type="primary"
                  className={styles.btn}
                  onClick={() => hanleDeleteOnCart(el?.id)}
                >
                  В корзинe
                </Button>
              ) : (
                <Button
                  type="primary"
                  className={styles.btn}
                  onClick={() => handleAddCart(el?.id)}
                >
                  В корзинy
                </Button>
              )}

              {!el?.isFavorite ? (
                <Button
                  onClick={() => handleAddFavorites(el?.id)}
                  className={styles.like}
                >
                  <HeartOutlined />
                </Button>
              ) : (
                <Button
                  onClick={() => handleDeleteFavorites(el?.id)}
                  className={styles.like}
                >
                  <HeartFilled />
                </Button>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Products;
