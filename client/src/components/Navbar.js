import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.scss";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar({ isAuthenticated, setAuth }) {

  const logout = async e => {
    //e.preventDefault();
    try {
      console.log("Logout successfully1");

      localStorage.removeItem("token");
      //console.log("Logout successfully2");
      //console.log("setAuth" + typeof setAuth);
      setAuth(false);
      //console.log("Logout successfully3");
      toast.success("Logout successfully");
      //console.log("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg rounded">
      <Link to="/" className="navbar-brand font-weight-bold rounded">YouToDo</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" >
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li>
            { 
              !isAuthenticated 
              ? (<Link className = "navbar-item nav-link" to="/login">Login</Link>) 
              : (<Link className = "navbar-item nav-link" to="/" onClick = {e => logout(e)}  >Logout</Link>)
            }
          </li>
        </ul>
      </div>
    </nav>
  )
};
