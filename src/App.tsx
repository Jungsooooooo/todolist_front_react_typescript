import "./App.css";
import Home from "./home/Home";
import CreateTodo from "./create/CreateTodo";
import TodoTable from "./table/TodoTable";
import Login from "./login/Login";
import JoinUser from "./login/JoinUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getCookie } from "./cookie/Cookie";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const cookie = getCookie("token");
  console.log({ cookie });
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<JoinUser />} />
          <Route
            path="/"
            element={
              <PrivateRoute authenticated={cookie} component={<Home />} />
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute authenticated={cookie} component={<CreateTodo />} />
            }
          />
          <Route
            path="/table"
            element={
              <PrivateRoute authenticated={cookie} component={<TodoTable />} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
