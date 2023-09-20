import { Button, Form, Input, Modal, Typography } from "antd";
import "../css/JoinUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const JoinUser = () => {
  const { confirm } = Modal;
  const { Title, Link } = Typography;
  const [id, setId] = useState("");
  const [checkIdExist, setCheckIdExist] = useState("");

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

    if (checkIdExist === "false" || checkIdExist === "") {
      return Modal.error({
        content: "아이디 중복확인을 해주세요",
      });
    }

    return createUser(values);
  };

  const onValuesChange = (allValues: any) => {
    setCheckIdExist("false");
    let id = allValues.id;
    const regExp = /[a-zA-Z0-9]/g;
    if (!regExp.test(id) && id !== "") {
      return Modal.error({
        content: "영어와 숫자로만 입력해주세요",
      });
    }
    setId(id);
  };

  const createUser = (value: FieldType) => {
    confirm({
      content: "가입하시겠습니까?",
      onOk() {
        const input = {
          id: id,
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
  const checkIdValid = () => {
    console.log("check");
    let idvalue = document.getElementById("basic_id") as HTMLInputElement;
    let id = idvalue.value;
    console.log(id === "");
    if (id === "") {
      return Modal.info({
        content: "아이디를 입력해주세요.",
      });
    }
    axios.get("/user/check/" + id).then((res) => {
      if (res.data.length > 0) {
        Modal.info({
          content: id + "는 사용중인 아이디 입니다.",
        });
      } else {
        Modal.info({
          content: id + "는 사용가능한 아이디 입니다.",
        });
        setCheckIdExist("true");
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
        onValuesChange={onValuesChange}
        autoComplete="off"
        className="joinView"
      >
        <Title className="titleJoin">Join</Title>
        <div className="inputidforjoin">
          <Button className="idcheckbutton" onClick={checkIdValid}>
            Check
          </Button>
          <Form.Item<FieldType>
            label="ID"
            name="id"
            rules={[{ required: true, message: "Please input your id!" }]}
          >
            <Input placeholder="영문 및 숫자" onChange={onValuesChange} />
          </Form.Item>
        </div>
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
