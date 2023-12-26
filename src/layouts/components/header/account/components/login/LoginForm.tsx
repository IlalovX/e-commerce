import { Button, Form, Input } from "antd";

import { FieldAuthType } from "../../types/FieldAuthType";
import { useLogin } from "../../../../../services/mutations";

import styles from "./login-form.module.scss";

function LoginForm({ showModalRegister, handleCancelLogin }) {
  const [form] = Form.useForm();
  const login = useLogin();

  const handleReset = () => {
    form.resetFields();
  };

  const onFinish = (values: FieldAuthType) => {
    login
      .mutateAsync({
        login: values.username as string,
        password: values.password as string,
      })
      .then(() => {
        handleReset();
        handleCancelLogin();
      });
  };

  return (
    <Form form={form} onFinish={onFinish} className={styles.form}>
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={styles.btns}>
        <Button type="primary" htmlType="submit" loading={login.isLoading}>
          Войти
        </Button>
        <Button type="primary" onClick={showModalRegister}>
          Регистрация
        </Button>
      </Form.Item>
      {login.isError && <p className={styles.error}>{login?.error?.message}</p>}
    </Form>
  );
}

export default LoginForm;
