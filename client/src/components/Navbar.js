import React from "react";
import "./Navbar.css";
function Navbar() {
  return (
    <div className="Navbar">
      <div className="Navbar-nav">
        <ul>
          <li>Bikes</li>
          <li>About Us</li>
        </ul>
      </div>
      <div className="Navbar-brand">
        <h1>Leo Cycling</h1>
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
    </div>
  );
}

export default Navbar;
