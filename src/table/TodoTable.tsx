import { useEffect, useState } from "react";
import { Divider, Table, Button } from "antd";

import axios from "axios";
import { UUID } from "crypto";

import { useSelector } from "react-redux";
import { RootState } from "../reducer";

interface Todo {
  key: UUID;
  todo: string;
  startDate: Date;
  uid: UUID;
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
];

const TodoTable = () => {
  const YearAndMonth = useSelector((state: RootState) => state.callTableReducer);

  const [allData, setAllData] = useState<Todo[] | undefined>([]);
  const [selectionType, setSelectionType] = useState<"checkbox">("checkbox");

  const [selectedRow, setSelectedRow] = useState<Todo | undefined>();

  const getData = async () => {
    return await axios.get("/todo/all").then((res) => {
      console.log(res.data);
      let datas = res.data;
      datas.map((data: Todo) => {
        data.key = data.uid;
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
  useEffect(() => {
    getData();
    console.log({ YearAndMonth });
  }, [selectedRow]);

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
        </div>
      )}
    </>
  );
};

export default TodoTable;
