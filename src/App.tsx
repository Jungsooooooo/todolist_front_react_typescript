import "./App.css";
import Home from "./home/Home";
import CreateTodo from "./create/CreateTodo";
import TodoTable from "./table/TodoTable";
import Login from "./login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTodo />} />
          <Route path="/table" element={<TodoTable />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
