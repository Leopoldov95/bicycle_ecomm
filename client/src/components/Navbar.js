import React, { useState } from "react";
import { Link } from "react-router-dom";
import BikeNav from "./BikeNav";
import "./css/Navbar.css";
function Navbar(props) {
  const [display, setDisplay] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [showMobileBikes, setShowMobileBikes] = useState(false);
  function handleDisplay() {
    setDisplay(!display);
  }
  function mobileBikeClick() {
    handleDisplay();
    setShowMobileBikes(!showMobileBikes);
  }

  function handleSignOut(e) {
    e.preventDefault();
    localStorage.clear(); // clears the entire local storage, needed to remove user from localStorage
    props.setUser(null);
  }
  return (
    <div className="Navbar">
      <div className="Navbar-main">
        {/* Navbar Mobile */}
        <div
          className="Navbar-mobile"
          onClick={() => setShowMobile(!showMobile)}
        >
          <button>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        {/* Navbar Normal */}
        <div className="Navbar-nav lg-screen">
          <ul>
            <li onClick={handleDisplay}>Bikes</li>
            <Link to="/about">
              <li>About</li>
            </Link>
          </ul>
        </div>
        <div className="Navbar-brand">
          <Link to="/">
            <h1>
              Leo
              <span>
                <i className="fas fa-bicycle"></i>
              </span>
              Cycling
            </h1>
          </Link>
        </div>
        <div className="Navbar-user">
          <ul>
            {props.user ? (
              <button onClick={handleSignOut} className="btn-signout">
                <i className="fas fa-sign-out-alt"></i> Sign Out
              </button>
            ) : (
              <Link to="/auth">
                <li className="lg-screen">Account</li>
              </Link>
            )}

            <li>
              <Link to="/cart">
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
          </ul>
        </div>
        <BikeNav large={true} display={display} handleDisplay={handleDisplay} />
      </div>
      {/* Mobile Only Navbar */}
      <div className="Navbar-secondary">
        <div
          className="mobile-links"
          style={{ display: `${showMobile ? "block" : "none"}` }}
        >
          <div className="Navbar-nav">
            <ul>
              <li onClick={mobileBikeClick}>
                <span>Bikes</span>
                <span>
                  {showMobileBikes ? (
                    <i className="fas fa-times"></i>
                  ) : (
                    <i className="fas fa-plus"></i>
                  )}
                </span>{" "}
              </li>
              <BikeNav
                large={false}
                display={display}
                handleDisplay={handleDisplay}
              />
              <Link to="/about">
                <li>About Us</li>
              </Link>
              <Link to="/auth">
                <li>Account</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
