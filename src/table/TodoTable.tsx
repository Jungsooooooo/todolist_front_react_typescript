import { useEffect, useState } from "react";
import { Divider, Radio, Table } from "antd";
import { Dayjs } from "dayjs";

import axios from "axios";
import { UUID } from "crypto";

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

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Todo[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  },
};

const TodoTable = () => {
  const [allData, setAllData] = useState<Todo[] | undefined>([]);
  const [dataSource, setDataSource] = useState<Todo[] | undefined>([]);
  const [selectionType, setSelectionType] = useState<"radio">("radio");

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

  useEffect(() => {
    getData();
  }, []);

  return (
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
  );
};

export default TodoTable;
