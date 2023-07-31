import { useEffect, useState } from "react";

import axios from "axios";
import { UUID } from "crypto";

interface Todo {
  key: UUID;
  todo: string;
  startDate: Date;
}

const TodoTable = () => {
  const [allData, setAllData] = useState<Todo[] | undefined>([]);

  const getData = async () => {
    return await axios.get("/todo/all").then((res) => {
      console.log(res.data);
      setAllData(res.data);
    });
  };

  useEffect(() => {
    getData();
  });

  return <div>table</div>;
};

export default TodoTable;
