import { Calendar, Button } from "antd";
import type { Dayjs } from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const goToCreate = () => {
    navigate("/create");
  };

  return (
    <div>
      <Button type="primary" onClick={goToCreate}>
        할 일 적기
      </Button>
      <Button>테이블로 보기</Button>
      <Calendar onPanelChange={onPanelChange} />
    </div>
  );
};

export default Home;
