import { Button, Input, Form, Select } from "antd";

import { useAppDispatch } from "../../../../utils/helpers/helpers";
import {
  setSortAscendingSubCards,
  setSortDescendingSubCards,
  setSortPriceSubCards,
  setSortPopularSubCards,
} from "../../../../store/slice/subCards";
import { FieldFilterType } from "../../types/FieldFilterType";

import styles from "./sub-cards-filter.module.scss";

function Filters() {
  const dispatch = useAppDispatch();

  const handleChangeSort = (value: string) => {
    if (value === "Сначала популярные") {
      dispatch(setSortPopularSubCards());
    } else if (value === "Сначала дешевые") {
      dispatch(setSortAscendingSubCards());
    } else {
      dispatch(setSortDescendingSubCards());
    }
  };

  const onFinish = (values: FieldFilterType) => {
    dispatch(
      setSortPriceSubCards({
        start: values.start as string,
        end: values.end as string,
      })
    );
  };

  return (
    <div className={styles.filter_sub_cards}>
      <h2>Сортировка</h2>
      <Select
        defaultValue="Сначала популярные"
        className={styles.select}
        onChange={handleChangeSort}
        options={[
          { value: "Сначала популярные", label: "Сначала популярные" },
          { value: "Сначала дешевые", label: "Сначала дешевые" },
          { value: "Сначала дорогие", label: "Сначала дорогие" },
        ]}
      />
      <hr />
      <h2>Цена</h2>
      <div className={styles.price}>
        <Form onFinish={onFinish} className={styles.form}>
          <Form.Item<FieldFilterType>
            label="От $"
            name="start"
            rules={[
              { required: true, message: "Please input your start price!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldFilterType>
            label="До $"
            name="end"
            rules={[
              { required: true, message: "Please input your end price!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Применить фильтр
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Filters;
