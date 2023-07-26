import React, { useState } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Input, Form, Button } from "antd";
import "../css/CreateTodo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTodo = () => {
  const { TextArea } = Input;
  const navigate = useNavigate();
  // const axios = require("axios").default;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [todo, setTodo] = useState<string>("");
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo(e.target.value);
  };

  const createTodo = () => {
    const input = {
      do: todo,
    };
    axios.post("/todo", input).then((res) => {
      navigate("/");
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
