import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./home/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Home />
        <Routes>
          <Route path="/test" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
