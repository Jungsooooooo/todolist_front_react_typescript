import { Button } from "antd";

import CalendarHome from "../calendar/CalendarHome";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/create");
  };

  const goToTable = () => {
    navigate("/table");
  };

  return (
    <div>
      <Button type="primary" onClick={goToCreate}>
        할 일 적기
      </Button>
      <Button onClick={goToTable}>테이블로 보기</Button>
      <CalendarHome />
    </div>
  );
};

export default Home;
