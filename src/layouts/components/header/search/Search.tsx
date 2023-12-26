import { AutoComplete, Input } from "antd";
import { NavLink, useSearchParams } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";

import { ItemType } from "../../../../types/ItemType";

import { getRouteDetail } from "../../../../routes/getPaths/getPaths";
import { useGetSearchProducts } from "../../../services/queries";

import styles from "./Search.module.scss";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isSuccess } = useGetSearchProducts();
  const debouncedValue = useDebounce<string>(searchText, 500);

  const renderItem = (
    id: string,
    name: string,
    img: string,
    price: number
  ) => ({
    label: (
      <div className={styles.card}>
        <img src={img} alt="" />
        <div>
          <NavLink to={getRouteDetail(id)}>
            <p>{name}</p>
          </NavLink>
          <span>{price}</span>
        </div>
      </div>
    ),
  });

  let options: Object = [];
  if (isSuccess) {
    options = [
      {
        options: data?.map((el: ItemType) =>
          renderItem(
            el?.id as string,
            el?.name as string,
            el?.imageUrls[0] as string,
            el?.price as number
          )
        ),
      },
    ];
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setSearchParams((prev) => {
      prev.set("search", String(event.target.value as string));
      return prev;
    });
  };
  useEffect(() => {}, [debouncedValue]);
  return (
    <div className={styles.search_container}>
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        options={options}
      >
        <Input
          className={styles.input}
          placeholder="Поиск товаров"
          value={searchText}
          onChange={handleChange}
          autoFocus={false}
        />
      </AutoComplete>
    </div>
  );
}

export default Search;
