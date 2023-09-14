import { Button, Form, Input, Modal, Typography } from "antd";
import "../css/JoinUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JoinUser = () => {
  const { confirm } = Modal;
  const nav = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    id?: string;
    password?: string;
    nickname?: string;
  };
  const onFinish = async (values: any) => {
    console.log("Success:", values);

    const input = {
      id: values.id,
      password: values.password,
      nickname: values.nickname,
    };

    return createUser(values);
  };

  const createUser = (value: FieldType) => {
    confirm({
      content: "가입하시겠습니까?",
      onOk() {
        const input = {
          id: value.id,
          password: value.password,
          name: value.nickname,
        };
        axios.post("/user", input).then((res) => {
          Modal.confirm({
            content: (
              <div>
                <p>가입되었습니다.</p>
              </div>
            ),
            okText: "로그인 하러 가기",
            onOk() {
              nav("/login");
            },
          });
        });
      },
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
        className="joinView"
      >
        <Form.Item<FieldType>
          label="ID"
          name="id"
          rules={[{ required: true, message: "Please input your id!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Nickname"
          name="nickname"
          rules={[{ required: true, message: "Please input your nickName!" }]}
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Join
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default JoinUser;
