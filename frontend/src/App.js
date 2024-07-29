// src/App.js
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Tasks } from "./components/Tasks";
import { Login } from "./components/Login";
import Register from "./components/Register";
import Settings from "./components/Settings";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
