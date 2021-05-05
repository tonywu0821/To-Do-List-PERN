import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.scss";


export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">YouToDo</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" >
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};
