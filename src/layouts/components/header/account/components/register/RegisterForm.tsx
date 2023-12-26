import { Button, Form, Input } from "antd";

import { FieldAuthType } from "../../types/FieldAuthType";
import { useLogin, useRegister } from "../../../../../services/mutations";

import styles from "./register-form.module.scss";

function RegisterForm({ handleCancelRegister }) {
  const [form] = Form.useForm();
  const register = useRegister();
  const login = useLogin();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: FieldAuthType) => {
    register
      .mutateAsync({
        firstName: values.firstname as string,
        lastName: values.lastname as string,
        login: values.username as string,
        password: values.password as string,
      })
      .then(() => {
        login
          .mutateAsync({
            login: values.username as string,
            password: values.password as string,
          })
          .then(() => {
            onReset();
            handleCancelRegister();
          });
      });
  };

  return (
    <Form form={form} onFinish={onFinish} className={styles.form}>
      <Form.Item<FieldAuthType>
        label="Firstname"
        name="firstname"
        rules={[{ required: true, message: "Please input your firstname!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldAuthType>
        label="Lastname"
        name="lastname"
        rules={[{ required: true, message: "Please input your lastname!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldAuthType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldAuthType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={register.isLoading}>
          Регистрация
        </Button>
      </Form.Item>
      {register.isError && (
        <p className={styles.error}>Register : {register?.error?.message}</p>
      )}
      {login.isError && (
        <p className={styles.error}>Login : {login?.error?.message}</p>
      )}
    </Form>
  );
}

export default RegisterForm;
