import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer-name">
        <span>
          &copy;Leo Cycling <span>|</span> All Rights Reserved
        </span>
      </div>
      <div className="Footer-icons">
        <ul>
          <li>
            <i className="fab fa-facebook-square"></i>
          </li>
          <li>
            <i className="fab fa-instagram"></i>
          </li>
          <li>
            <i className="fab fa-twitter"></i>
          </li>
          <li>
            <i className="fab fa-youtube"></i>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i>
          </li>
          <li>
            <i className="fab fa-pinterest"></i>
          </li>
        </ul>
      </div>
      <div className="Footer-logo">
        <img src="/img/logo.png" alt="logo" />
      </div>
    </div>
  );
}

export default Footer;
