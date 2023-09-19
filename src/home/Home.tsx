import { Button, Modal } from "antd";

import CalendarHome from "../calendar/CalendarHome";
import { getCookie } from "../cookie/Cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { confirm } = Modal;

  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/create");
  };

  const goToTable = () => {
    navigate("/table");
  };

  const logout = () => {
    confirm({
      content: "로그아웃 하시겠습니까?",
      onOk() {
        document.cookie =
          "token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
        Modal.info({
          content: (
            <div>
              <p>로그아웃 되었습니다.</p>
            </div>
          ),
          onOk() {},
        });
      },
    });
  };

  return (
    <div>
      <Button type="primary" onClick={goToCreate}>
        할 일 적기
      </Button>
      <Button onClick={goToTable}>테이블로 보기</Button>
      <Button danger type="text" className="logoutbutton" onClick={logout}>
        로그아웃
      </Button>
      <CalendarHome />
    </div>
  );
};

export default Home;
