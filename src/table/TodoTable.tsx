import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Table, Button, Modal, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

import axios from "axios";
import { UUID } from "crypto";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bringYearAndMonthTable } from "../action/tAction";

import { RootState } from "../reducer";

import "../css/TodoTable.css";

interface Todo {
  key: UUID;
  do: string;
  startDate: Date;
  endDate: Date;
  uid: UUID;
  state: string;
}
const columns = [
  {
    title: "할 일",
    dataIndex: "do",
    key: "do",
  },
  {
    title: "시작일",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "종료일",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "상태",
    dataIndex: "state",
    key: "state",
  },
];

const TodoTable = () => {
  const YearAndMonth = useSelector((state: RootState) => state.callTableReducer);
  const { confirm } = Modal;
  const [allData, setAllData] = useState<Todo[] | undefined>([]);
  const [selectionType, setSelectionType] = useState<"checkbox">("checkbox");
  const [month, setMonth] = useState<number | undefined>();
  const monthFormat = "YYYY/MM";
  const formattedMonth = YearAndMonth.month.toString().padStart(2, "0");
  const defaultDate = YearAndMonth.year + "/" + formattedMonth + YearAndMonth.date;
  const [selectedRow, setSelectedRow] = useState<Todo | null>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    return await axios.get("/todo/" + YearAndMonth.year + "/" + YearAndMonth.month).then((res) => {
      console.log(res.data);
      let datas = res.data;
      datas.map((data: Todo) => {
        data.key = data.uid;
        if (data.state === "processing") {
          data.state = "진행중";
        } else {
          data.state = "완료";
        }
      });
      setAllData(datas);
    });
  };

  const getDateData = async () => {
    console.log(YearAndMonth);

    if (YearAndMonth.year === 0) {
      return null;
    } else {
      return await axios
        .get("/todo/date/" + YearAndMonth.year + "/" + YearAndMonth.month + "/" + YearAndMonth.date)
        .then((res) => {
          console.log(res.data);
          let datas = res.data;
          datas.map((data: Todo) => {
            data.key = data.uid;
            if (data.state === "processing") {
              data.state = "진행중";
            } else {
              data.state = "완료";
            }
          });
          setAllData(datas);
        });
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Todo[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);

      return setSelectedRow(selectedRows[0]);
    },
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);

    if (date === undefined || date === null) {
      const nullInput = {
        year: 0,
        month: 0,
        date: 0,
      };
      dispatch(bringYearAndMonthTable(nullInput));
      setMonth(0);
    } else {
      const input = {
        year: date?.year(),
        month: date?.month() + 1,
        date: date?.date(),
      };
      dispatch(bringYearAndMonthTable(input));
      setMonth(date?.month() + 1);
    }
  };

  const showAlldata = async () => {
    return await axios.get("/todo/all").then((res) => {
      console.log(res.data);
      let datas = res.data;
      datas.map((data: Todo) => {
        data.key = data.uid;
        if (data.state === "processing") {
          data.state = "진행중";
        } else {
          data.state = "완료";
        }
      });
      setAllData(datas);
    });
  };

  const deleteSelection = async () => {
    confirm({
      content: "삭제하시겠습니까?",
      onOk() {
        return axios.delete("/todo/" + selectedRow?.uid).then((res) => {
          Modal.info({
            content: (
              <div>
                <p>변경되었습니다.</p>
              </div>
            ),
            onOk() {
              setSelectedRow(null);
            },
          });
        });
      },
      onCancel() {},
    });
  };

  const finishSelection = async () => {
    confirm({
      content: "완료 처리 하시겠습니까?",
      onOk() {
        const input = {
          state: "success",
          endDate: new Date(),
        };
        return axios.put("/todo/" + selectedRow?.uid, input).then((res) => {
          Modal.info({
            content: (
              <div>
                <p>변경되었습니다.</p>
              </div>
            ),
            onOk() {
              setSelectedRow(null);
              setSelectedRow(res.data);
            },
          });
        });
      },
      onCancel() {},
    });
  };

  const unFinishSelection = async () => {
    // setOpen(!open)

    confirm({
      content: "완료 취소 하시겠습니까?",
      onOk() {
        const input = {
          state: "processing",
          endDate: null,
        };
        return axios.put("/todo/" + selectedRow?.uid, input).then((res) => {
          Modal.info({
            content: (
              <div>
                <p>변경되었습니다.</p>
              </div>
            ),
            onOk() {
              setSelectedRow(null);
              setSelectedRow(res.data);
            },
          });
        });
      },
      onCancel() {},
    });
  };

  const goToCreate = () => {
    navigate("/create");
  };

  const goToTable = () => {
    navigate("/");
  };

  useEffect(() => {
    getDateData();
  }, [selectedRow, month]);

  return (
    <>
      <div>
        <Button type="primary" onClick={goToCreate}>
          할 일 적기
        </Button>
        <Button onClick={goToTable}>달력으로 보기</Button>
        <div>
          <DatePicker
            className="chooseDate"
            onChange={onChange}
            // picker="date"
            // defaultValue={dayjs(defaultDate, monthFormat)}
            // format={monthFormat}
          />
        </div>
        <Divider />
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          dataSource={allData}
          columns={columns}
        />
      </div>
      {selectedRow === null || selectedRow === undefined ? (
        ""
      ) : (
        <div>
          <Button onClick={deleteSelection}>할 일 삭제</Button>
          {selectedRow.state === "진행중" ? (
            <Button className="finishButton" danger onClick={finishSelection}>
              완료
            </Button>
          ) : (
            <Button className="unFinishButton" danger onClick={unFinishSelection}>
              완료 취소
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default TodoTable;
