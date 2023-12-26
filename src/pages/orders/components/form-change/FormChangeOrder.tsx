import { Button, DatePicker, DatePickerProps, Form, Input } from "antd";
import { useState } from "react";

import { FieldOrderType } from "../../../../types/FieldOrderType";
import { useChangeOrder } from "../../services/mutations";

import styles from "./form-change-order.module.scss";

function FormChangeOrder({ id, handleClose }) {
  const [time, setTime] = useState<string>("");

  const onFinish = (values: FieldOrderType) => {
    useChangeOrder()
      .mutateAsync({
        id: id,
        details: {
          name: values.name as string,
          address: values.address as string,
          phone: values.phone as string,
          timeToDeliver: time,
          comment: values.comment as string,
        },
      })
      .then(() => {
        handleClose();
      });
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setTime(dateString);
  };

  return (
    <Form onFinish={onFinish} className={styles.form}>
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

export default FormChangeOrder;
