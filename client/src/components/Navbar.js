import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import BikeNav from "./BikeNav";
import "./css/Navbar.css";
const Navbar = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [display, setDisplay] = useState(false);
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

  const handleSignOut = () => {
    props.setInitMsg(true);
    localStorage.clear(); // clears the entire local storage, needed to remove user from localStorage
    props.setUser(null);
    props.setItems([]);
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

            <li>
              <Link to="/cart" className="Navbar-cart">
                <i className="fas fa-shopping-bag"></i>
                {props.itemNum > 0 && (
                  <span
                    className={`cart-num ${props.cartMsg ? "cart-msg" : ""}`}
                  >
                    {props.itemNum}
                  </span>
                )}
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
                setShowMobile={setShowMobile}
              />
              <Link to="/about" onClick={() => setShowMobile(false)}>
                <li>About Us</li>
              </Link>
              {props.user ? (
                <li
                  onClick={() => {
                    handleSignOut();
                    setShowMobile(false);
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i> Sign Out
                </li>
              ) : (
                <Link to="/auth" onClick={() => setShowMobile(false)}>
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
