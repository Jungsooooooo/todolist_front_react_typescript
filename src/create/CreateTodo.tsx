import React, { useState } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Input, Form } from "antd";
import "../css/CreateTodo.css";

const CreateTodo = () => {
  const { TextArea } = Input;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date);
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
            <TextArea rows={4} />
          </Form.Item>
        </div>
      </Space>
    </>
  );
};

export default CreateTodo;
