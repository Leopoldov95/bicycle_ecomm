import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/BikeNav.css";
import BikeData from "../bikes.json";
function BikeNav(props) {
  const location = useLocation();
  const [active, setActive] = useState(1);
  useEffect(() => {
    if (!props.large) {
      props.setShowMobile(false);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const bikes = {
    1: [BikeData[0], BikeData[1]],
    2: [BikeData[2], BikeData[9]],
    3: [BikeData[3]],
    4: [BikeData[4], BikeData[5], BikeData[6], BikeData[7]],
    5: [BikeData[8], BikeData[10], BikeData[11]],
  };
  function handleClick(id) {
    setActive(id);
  }
  function displayNavBikes(id) {
    if (id) {
      return bikes[id].map((bike) => (
        <Link
          key={bike.id}
          to={`/bikes/${bike.id}`}
          onClick={props.handleDisplay}
        >
          <div className="BikeNav-bike-card ">
            <img src={`/img/bikes/${bike.image}`} alt={bike.subtitle} />
            <span>{bike.subtitle}</span>
            <span>
              <strong>${bike.price}</strong>
            </span>
          </div>
        </Link>
      ));
    }
  }
  function setActiveClass(id) {
    return `${active === id ? "active" : ""}`;
  }
  return (
    <div
      className={`BikeNav ${props.large ? "lg-screen" : "mobile-screen"}`}
      style={{ display: `${props.display ? "flex" : "none"}` }}
      onMouseLeave={props.handleDisplay}
    >
      <div className="BikeNav-select">
        <ul>
          {/* May want to refactor here */}
          <li
            id={1}
            className={setActiveClass(1)}
            onClick={() => handleClick(1)}
          >
            Fixed Gear
          </li>
          <li
            id={2}
            className={setActiveClass(2)}
            onClick={() => handleClick(2)}
          >
            Adventure
          </li>
          <li
            id={3}
            className={setActiveClass(3)}
            onClick={() => handleClick(3)}
          >
            Road
          </li>
          <li
            id={4}
            className={setActiveClass(4)}
            onClick={() => handleClick(4)}
          >
            City
          </li>
          <li
            id={5}
            className={setActiveClass(5)}
            onClick={() => handleClick(5)}
          >
            Commuter
          </li>
          <Link to="/bikes">
            <li>All Bikes</li>
          </Link>
        </ul>
      </div>
      <div className="BikeNav-bikes">{displayNavBikes(active)}</div>
    </div>
  );
}

export default BikeNav;
