import "./App.css";
import Home from "./home/Home";
import CreateTodo from "./create/CreateTodo";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
