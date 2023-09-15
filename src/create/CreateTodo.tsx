import React, { useState } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Input, Form, Button, Modal } from "antd";
import "../css/CreateTodo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie/Cookie";
import { useSelector } from "react-redux";
import { RootState } from "../reducer";

const CreateTodo = () => {
  const user = useSelector((state: RootState) => state.loginSet);
  console.log({ user });
  const { TextArea } = Input;
  const { confirm } = Modal;

  const navigate = useNavigate();
  // const axios = require("axios").default;
  const dayjs = require("dayjs");

  const [todo, setTodo] = useState<string>("");
  const [startDate, setStartDate] = useState<string | undefined>();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setStartDate(dateString);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo(e.target.value);
  };

  const createTodo = () => {
    confirm({
      content: "생성하시겠습니까?",
      onOk() {
        const input = {
          do: todo,
          startDate: startDate,
          uid: user.uid,
        };
        axios
          .post("/todo", input, {
            headers: { Authorization: getCookie("token") },
          })
          .then((res) => {
            Modal.confirm({
              content: (
                <div>
                  <p>생성되었습니다.</p>
                </div>
              ),
              okText: "할일 계속 적기",
              cancelText: "달력으로 이동",
              onOk() {},
              onCancel() {
                navigate("/");
              },
            });
          });
      },
      onCancel() {},
    });
  };

  return (
    <>
      <div className="selectDate">
        <Space direction="vertical">
          <Form.Item label="날짜">
            <DatePicker onChange={onChange} />
          </Form.Item>
        </Space>
      </div>
      <Space direction="vertical">
        <div className="textTodo">
          <Form.Item label="내용">
            <TextArea rows={4} onChange={handleChange} />
          </Form.Item>
          <Button onClick={createTodo}>생성</Button>
        </div>
      </Space>
    </>
  );
};

export default CreateTodo;
