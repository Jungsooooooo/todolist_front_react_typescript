import { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import { Dayjs } from "dayjs";
import type { BadgeProps } from "antd";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { UUID } from "crypto";
import axios from "axios";

import "../css/CalendarHome.css";

interface Todo {
  uid: UUID;
  todo: string;
  startDate: Date;
}

interface listDate {
  type: string;
  content: string;
}

const CalendarHome = () => {
  const [todoData, setTodoData] = useState<Todo[] | undefined>([]);
  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    const response = await axios.get("/todo/all");
    const todoData: Todo[] = response.data;
    setTodoData(todoData);
    return todoData;
  };

  const getListData = (value: Dayjs) => {
    let listData: listDate[] = [];

    todoData?.map((todo) => {
      let fulldate = new Date(todo.startDate);
      let month = fulldate.getMonth();
      let date = fulldate.getDate();

      if (value.month() === month) {
        switch (value.date()) {
          case date:
            listData.push({ type: "success", content: todo.todo });
            break;
          default:
        }
      }
    });

    return listData || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="todolist">
        {listData.map((item: listDate) => (
          <li className="no_dot" key={item.content}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);

    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default CalendarHome;
