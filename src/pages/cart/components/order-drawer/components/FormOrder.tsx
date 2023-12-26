import { Button, DatePicker, DatePickerProps, Form, Input } from "antd";
import { useState } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../utils/helpers/helpers";
import { FieldOrderType } from "../../../../../types/FieldOrderType";
import { clearArray } from "../../../../../store/slice/cart";
import { useSetOrder } from "../../../services/mutations";

import styles from "./form-order.module.scss";

function FormOrder({ onClose }) {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState<string>("");
  const items = useAppSelector((state) => state.cart.items);
  const [form] = Form.useForm();
  const order = useSetOrder();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setTime(dateString);
  };
  const handleReset = () => {
    form.resetFields();
  };
  const onFinish = (values: FieldOrderType) => {
    order
      .mutateAsync({
        items,
        details: {
          name: values.name as string,
          address: values.address as string,
          phone: values.phone as string,
          timeToDeliver: time as string,
          comment: values.comment as string,
        },
      })
      .then(() => {
        onClose();
        dispatch(clearArray());
        handleReset();
      });
  };

  return (
    <Form form={form} name="basic" onFinish={onFinish} className={styles.form}>
      <Form.Item<FieldOrderType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldOrderType>
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldOrderType>
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input your phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldOrderType>
        label="Time"
        name="timeToDelivery"
        rules={[{ required: true, message: "Please input your time!" }]}
      >
        <DatePicker onChange={onChange} className={styles.data} />
      </Form.Item>

      <Form.Item<FieldOrderType> label="Comment" name="comment">
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormOrder;
