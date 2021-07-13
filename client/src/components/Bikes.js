import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BikeData from "../bikes.json";
import "./css/Bikes.css";
//import { styleFilter, speedFilter, priceFilter } from "./helper/filter";
const Bikes = () => {
  const priceRange = [
    "$0 - $300",
    "$301 - $500",
    "$501 - $700",
    "$701 - $1000",
  ];
  const [showFilter, setShowFilter] = useState(false);
  const [displayBikes, setDisplayBikes] = useState(BikeData);
  const [filters, setFilters] = useState({
    style: null,
    speed: null,
    price: null,
  });

  useEffect(() => {
    updateBikes();
  }, [filters]);

  // sets the filter for styles
  const styleFilter = (filter) => {
    if (!filter) {
      return BikeData;
    } else {
      setFilters({ ...filters, style: filter });

      return BikeData.filter((bike) => bike.style === filter);
    }
  };

  // sets the filter for speed
  const speedFilter = (filter) => {
    if (!filter) {
      return BikeData;
    } else {
      setFilters({ ...filters, speed: filter });

      return BikeData.filter((bike) => bike.speed === filter);
    }
  };

  // sets the filter for price
  const priceFilter = (filter) => {
    if (!filter) {
      return BikeData;
    } else {
      setFilters({ ...filters, price: filter });
    }
  };

  /* //////////////////////// */
  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const deleteFilter = (val) => {
    // alert(val);
    const filterName = Object.keys(filters).find((key) => filters[key] === val);
    if (filterName === "style") {
      setFilters({ ...filters, style: null });
    } else if (filterName === "price") {
      setFilters({ ...filters, price: null });
    } else {
      setFilters({ ...filters, speed: null });
    }
  };

  /* Creating filter list */
  const handleStyles = () => {
    const arr = [];
    BikeData.forEach((bike) => {
      arr.push(bike.style);
    });
    const set = new Set(arr);
    return set;
  };

  const handleSpeed = () => {
    const arr = [];
    BikeData.forEach((bike) => {
      arr.push(bike.speed);
    });
    const set = new Set(arr);
    return set;
  };

  const styles = handleStyles();
  const speeds = handleSpeed();

  const handlePriceFilter = (price, bikes) => {
    const arr = [];
    const newArr = price.split("-");
    for (let i of newArr) {
      arr.push(Number(i.match(/(\d+)/)[0]));
    }
    return bikes.filter((bike) => bike.price >= arr[0] && bike.price <= arr[1]);
  };

  const updateBikes = () => {
    // checking if any filters are currently active

    // so when chaning filters of the same category, it dervies the new list from the exisitng modified list rather than the orignal list
    if (Object.values(filters).some((el) => el !== null)) {
      let newDisplay = BikeData;
      for (let [key, value] of Object.entries(filters)) {
        if (value !== null && key !== "price") {
          // double loop here
          newDisplay = newDisplay.filter((item) => item[key] === value);

          setDisplayBikes(newDisplay);
        } else if (value !== null && key === "price") {
          // handle price setting here, may want to refactor later
          newDisplay = handlePriceFilter(filters.price, newDisplay);
          setDisplayBikes(newDisplay);
        }
      }
    } else {
      // if no filters are present
      setDisplayBikes(BikeData);
    }
  };
  return (
    <div className="Bikes">
      <div
        className="Bikes-hero"
        style={{
          background:
            ' no-repeat center/cover url("/img/shop/bike_travel.jpg")',
        }}
      >
        <h2>Bicycles</h2>
        <p>
          Every Bicycle Comes With{" "}
          <span style={{ color: "#69e0de" }}>Lifetime Warranty</span>
        </p>
      </div>
      <div className="Bikes-header">
        <div className="Bikes-filter">
          <button onClick={handleFilter}>
            <i className="fas fa-sliders-h"></i>
          </button>
          <span>{showFilter ? "Hide Filters" : "Show Filters"}</span>
        </div>
        <div className="Bikes-filter-display">
          {Object.keys(filters).map(
            (filterName) =>
              filters[filterName] !== null && (
                <div className="Bikes-filter-card" key={filterName}>
                  <span>{filters[filterName]}</span>
                  <i
                    onClick={() => deleteFilter(filters[filterName])}
                    className="fas fa-times"
                  ></i>
                </div>
              )
          )}
        </div>
      </div>
      <div
        className="Bikes-container"
        style={{ display: `${showFilter ? "grid" : "block"}` }}
      >
        <div
          className="Bikes-settings"
          style={{ display: `${showFilter ? "block" : "none"}` }}
        >
          <form action="">
            <h2>Style</h2>
            {[...styles].map((style) => (
              <div className="radio" key={style}>
                <input
                  onClick={() => styleFilter(style)}
                  checked={filters.style === style}
                  type="radio"
                  id={style}
                  name="style"
                  value={style}
                />
                 
                <label className="radio-label" htmlFor={style}>
                  {style}
                </label>
              </div>
            ))}
          </form>
          <form action="">
            <h2>Speeds</h2>
            {[...speeds].map((speed) => (
              <div className="radio" key={speed}>
                <input
                  onClick={() => speedFilter(speed)}
                  checked={filters.speed === speed}
                  type="radio"
                  id={speed}
                  name="speed"
                  value={speed}
                />
                 
                <label className="radio-label" htmlFor={speed}>
                  {speed}
                </label>
              </div>
            ))}
          </form>
          <form action="">
            <h2>Price</h2>

            {priceRange.map((price) => (
              <div className="radio">
                <input
                  onClick={() => priceFilter(price)}
                  checked={filters.price === price}
                  type="radio"
                  id={price}
                  name="price"
                  value={price}
                />
                 
                <label className="radio-label" htmlFor={price}>
                  {price}
                </label>
              </div>
            ))}
          </form>
        </div>
        <div className="Bikes-products">
          {displayBikes.map((bike) => (
            <Link key={bike.id} to={`/bikes/${bike.id}`}>
              <div className="Bikes-card">
                <img src={`/img/bikes/${bike.image}`} alt={bike.subtitle} />
                <span>{bike.title}</span>
                <span className="Bikes-card-price">${bike.price}</span>
                <div className="Bikes-card-link">
                  <span>View Bicycle</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bikes;
