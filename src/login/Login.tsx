import React from "react";
import { Button, Form, Input, Typography } from "antd";
import "../css/Login.css";
import axios from "axios";
import { getCookie, setCookie } from "../cookie/Cookie";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { Title, Link } = Typography;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  id?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const nav = useNavigate();
  const go = () => {
    nav("/");
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    const input = {
      id: values.id,
      password: values.password,
    };

    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 60);

    return axios.post("/authentification/login", input).then((res) => {
      if (res.status === 201) {
        setCookie("token", "Bearer " + res.data.accessToken, {
          expires: currentDate,
        });
        go();
      }
    });
  };
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
        <Title className="loginTitle">Todo</Title>
        <Form.Item<FieldType>
          label="ID"
          name="id"
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
          <Link href="/join">Go to Join</Link>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
