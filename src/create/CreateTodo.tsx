import React from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Input, Form } from "antd";
import "../css/CreateTodo.css";

const CreateTodo = () => {
  const { TextArea } = Input;
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <Space direction="vertical">
        <DatePicker onChange={onChange} />

        <div className="textTodo">
          <Form.Item label="내용">
            <TextArea rows={4} />
          </Form.Item>
        </div>
      </Space>
    </>
  );
};

export default CreateTodo;
