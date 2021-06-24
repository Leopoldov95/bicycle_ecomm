import React from "react";
import { Link } from "react-router-dom";
import BikeNav from "./BikeNav";
import "./Navbar.css";
function Navbar() {
  return (
    <div className="Navbar">
      <div className="Navbar-nav">
        <ul>
          <li>Bikes</li>
          <Link to="/about">
            <li>About Us</li>
          </Link>
        </ul>
      </div>
      <div className="Navbar-brand">
        <Link to="/">
          <h1>Leo Cycling</h1>
        </Link>
      </div>
      <div className="Navbar-user">
        <ul>
          <li>Login</li>
          <li>Register</li>
          <li>
            <i className="fas fa-shopping-cart"></i>
          </li>
        </ul>
      </div>
      <BikeNav />
    </div>
  );
}

export default Navbar;
