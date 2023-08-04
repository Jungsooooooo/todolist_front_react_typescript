import { useEffect, useState } from "react";
import { Divider, Table, Button, Modal } from "antd";

import axios from "axios";
import { UUID } from "crypto";

import { useSelector } from "react-redux";
import { RootState } from "../reducer";

interface Todo {
  key: UUID;
  todo: string;
  startDate: Date;
  uid: UUID;
  state: string;
}
const columns = [
  {
    title: "할 일",
    dataIndex: "todo",
    key: "todo",
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

  const [selectedRow, setSelectedRow] = useState<Todo | undefined>();

  const getData = async () => {
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

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Todo[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
      return setSelectedRow(selectedRows[0]);
    },
  };

  const deleteSelection = async () => {
    console.log(selectedRow?.uid);
    return axios.delete("/todo/" + selectedRow?.uid).then((res) => {
      setSelectedRow(res.data);
    });
  };

  const finishSelection = async () => {
    confirm({
      content: "완료 처리 하시겠습니까?",
      onOk() {
        const input = {
          state: "success",
        };
        return axios.put("/todo/" + selectedRow?.uid, input).then(() => {
          Modal.info({
            content: (
              <div>
                <p>변경되었습니다.</p>
              </div>
            ),
            onOk() {},
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
        };
        return axios.put("/todo/" + selectedRow?.uid, input).then(() => {
          Modal.info({
            content: (
              <div>
                <p>변경되었습니다.</p>
              </div>
            ),
            onOk() {},
          });
        });
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    getData();
    console.log({ YearAndMonth });
  }, [selectedRow, unFinishSelection, finishSelection]);

  return (
    <>
      <div>
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
            <Button className="finishButton" danger onClick={unFinishSelection}>
              완료 취소
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default TodoTable;
