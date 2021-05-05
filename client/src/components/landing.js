import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.scss";

const Landing = () => {
  return (
    <div className="jumbotron bg-dark mt-5 text-white">
      <h1 className ="display-4">Welcome to <span className="border border-white font-weight-bold rounded text-while bg-danger">YouToDo</span>!</h1>
      <hr className="my-1"></hr>
      <p>This is an application that help you build your own todo list! </p>
      <p>Login now to manage your tasks!</p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Register
      </Link>
    </div>
  );
};

export default Landing;