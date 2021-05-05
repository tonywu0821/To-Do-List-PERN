import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
//import "../styles/Dashboard.scss";

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  const getProfile = async () => {
    try {
      console.log("getProfile");
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { authorization: localStorage.token }
      });

      const parseData = await res.json();
      console.log("parseData:");
      setAllTodos(parseData);

      setName(parseData[0].user_name);

    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="d-flex mt-5 justify-content-around">
        <h2>Welcome back, <span className = "text-primary font-weight-bold">{name}!</span> </h2>
      </div>
      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </>
  );
};

export default Dashboard;