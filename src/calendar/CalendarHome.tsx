import { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import { Dayjs } from "dayjs";
import type { BadgeProps } from "antd";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { UUID } from "crypto";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCookie } from "../cookie/Cookie";
import { useSelector } from "react-redux";
import { RootState } from "../reducer";

import "../css/CalendarHome.css";
import { bringYearAndMonthTable } from "../action/tAction";

interface Todo {
  uid: UUID;
  do: string;
  startDate: Date;
  state: string;
}

interface listDate {
  type: string;
  content: string;
  uid: string;
}

const CalendarHome = () => {
  const dispatch = useDispatch();
  const example = useSelector((state: RootState) => state);
  console.log({ example });

  let today = new Date();

  let year = today.getFullYear();
  let defaultMonth = today.getMonth() + 1;

  const [todoData, setTodoData] = useState<Todo[] | undefined>([]);
  const [month, setMonth] = useState<number>(defaultMonth);

  useEffect(() => {
    getTodo();
  }, [month]);

  const getTodo = async () => {
    const response = await axios.get("/todo/" + year + "/" + month, {
      headers: { Authorization: getCookie("token") },
    });
    const todoData: Todo[] = response.data;
    setTodoData(todoData);

    return todoData;
  };

  const handleDateSelect = (value: Dayjs) => {
    console.log(value);
    let info = {
      year: value.year(),
      month: value.month() + 1,
      date: value.date(),
    };
    // console.log(value.month());
    setMonth(value.month() + 1);
    dispatch(bringYearAndMonthTable(info));
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
            listData.push({
              type: todo.state,
              content: todo.do,
              uid: todo.uid,
            });
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
          <li className="no_dot" key={item.uid}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);

    return info.originNode;
  };

  return <Calendar cellRender={cellRender} onSelect={handleDateSelect} />;
};

export default CalendarHome;
