import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import BikeNav from "./BikeNav";
import "./css/Navbar.css";
const Navbar = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [display, setDisplay] = useState(false);
  //const [itemNum, setItemNum] = useState(0);
  const [showMobile, setShowMobile] = useState(false);
  const [showMobileBikes, setShowMobileBikes] = useState(false);

  useEffect(() => {
    setDisplay(false);
  }, [location]);
  const handleDisplay = () => {
    setDisplay(!display);
  };
  const mobileBikeClick = () => {
    handleDisplay();
    setShowMobileBikes(!showMobileBikes);
  };

  const handleSignOut = (e) => {
    e.preventDefault();

    props.setInitMsg(true);
    localStorage.clear(); // clears the entire local storage, needed to remove user from localStorage
    props.setUser(null);
    history.push("/");
  };
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
              <li onClick={handleSignOut} className="lg-screen">
                <i className="fas fa-sign-out-alt"></i> Sign Out
              </li>
            ) : (
              <Link to="/auth">
                <li className="lg-screen">Account</li>
              </Link>
            )}

            <li className="Navbar-cart">
              <Link to="/cart">
                <i className="fas fa-shopping-bag"></i>
              </Link>
              {props.itemNum > 0 && <span>{props.itemNum}</span>}
            </li>
          </ul>
        </div>
        <BikeNav large={true} display={display} />
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
              {props.user ? (
                <li onClick={handleSignOut}>
                  <i className="fas fa-sign-out-alt"></i> Sign Out
                </li>
              ) : (
                <Link to="/auth">
                  <li>Account</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
