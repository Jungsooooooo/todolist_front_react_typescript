import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "../css/Login.css";
import axios from "axios";
import { getCookie, setCookie } from "../cookie/Cookie";

const onFinish = async (values: any) => {
  console.log("Success:", values);

  const input = {
    id: values.username,
    password: values.password,
  };

  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 1);

  axios.post("/authentification/login", input).then((res) =>
    setCookie("token", "Bearer " + res.data.accessToken, {
      expires: currentDate,
    })
  );
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const test = () => {
  console.log(getCookie("token"));
  return axios
    .get("/authentification/test", {
      headers: { Authorization: getCookie("token") },
    })
    .then((res) => console.log(res));
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="loginView"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary" onClick={test}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
