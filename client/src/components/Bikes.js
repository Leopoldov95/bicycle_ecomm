import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BikeData from "../bikes.json";
import "./css/Bikes.css";
//import { styleFilter, speedFilter, priceFilter } from "./helper/filter";
function Bikes() {
  const priceRange = [300, 500, 700, 800];
  const [showFilter, setShowFilter] = useState(true);
  const [displayBikes, setDisplayBikes] = useState(BikeData);
  const [filters, setFilters] = useState({
    style: null,
    speed: null,
    price: null,
  });

  useEffect(() => {
    updateBikes();
  }, [filters]);
  /*  const [currStyle, setCurrStyle] = useState(null);
  const [currSpeed, setCurrSpeed] = useState(null);
  const [currPrice, setCurrPrice] = useState(null); */
  /* create a useEffect here to change filter cards */
  /*   useEffect(() => {
    setFilters([currStyle, currPrice, currSpeed]);
  }, [currStyle, currPrice, currSpeed]); */
  /* Set Filter */

  // sets the filter for styles
  function styleFilter(filter) {
    if (!filter) {
      return BikeData;
    } else {
      setFilters({ ...filters, style: filter });

      return BikeData.filter((bike) => bike.style === filter);
    }
  }

  // sets the filter for speed
  function speedFilter(filter) {
    if (!filter) {
      return BikeData;
    } else {
      setFilters({ ...filters, speed: filter });

      return BikeData.filter((bike) => bike.speed === filter);
    }
  }

  // sets the filter for price
  function priceFilter(filter) {
    if (!filter) {
      return BikeData;
    } else {
      setFilters({ ...filters, price: filter });
    }
  }

  /* //////////////////////// */
  function handleFilter() {
    setShowFilter(!showFilter);
  }

  function deleteFilter(val) {
    // alert(val);
    const filterName = Object.keys(filters).find((key) => filters[key] === val);
    if (filterName === "style") {
      setFilters({ ...filters, style: null });
    } else if (filterName === "price") {
      setFilters({ ...filters, price: null });
    } else {
      setFilters({ ...filters, speed: null });
    }
  }

  /* Creating filter list */
  function handleStyles() {
    const arr = [];
    BikeData.forEach((bike) => {
      arr.push(bike.style);
    });
    const set = new Set(arr);
    return set;
  }

  function handleSpeed() {
    const arr = [];
    BikeData.forEach((bike) => {
      arr.push(bike.speed);
    });
    const set = new Set(arr);
    return set;
  }

  /*  function generatePriceFilter(arr) {
    for (let price of arr) {
      if (arr[price] === 0) {
        return (
          <div>
            <input
              onClick={() => priceFilter(price)}
              type="radio"
              id={price}
              name="price"
              value={price}
            />
             <label htmlFor={price}>Under ${price}</label>
          </div>
        );
      } else if (arr[price] === arr.length - 1) {
        return (
          <div>
            <input
              onClick={() => priceFilter(price)}
              type="radio"
              id={price}
              name="price"
              value={price}
            />
             <label htmlFor={price}>${price}+</label>
          </div>
        );
      } else {
        return (
          <div>
            <input
              onClick={() => priceFilter(price)}
              type="radio"
              id={price}
              name="price"
              value={price}
            />
             
            <label htmlFor={price}>
              {arr[indexOf(price) - 1]} - {price}
            </label>
          </div>
        );
      }
    } 
  } */
  const styles = handleStyles();
  const speeds = handleSpeed();

  function updateBikes() {
    // checking if any filters are currently active
    if (Object.values(filters).some((el) => el !== null)) {
      for (let [key, value] of Object.entries(filters)) {
        if (value !== null) {
          console.log(`${key} is active`);
          console.log(BikeData[0][key] === value);
          // double loop here
          let newDisplay = displayBikes.filter((item) => item[key] === value);

          console.log(newDisplay);
          setDisplayBikes(newDisplay);
        }
      }
    } else {
      // if no filters are present
      setDisplayBikes(BikeData);
    }
  }
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
                <div className="Bikes-filter-card">
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
              <div>
                <input
                  onClick={() => styleFilter(style)}
                  checked={filters.style === style}
                  type="radio"
                  id={style}
                  name="style"
                  value={style}
                />
                 <label htmlFor={style}>{style}</label>
              </div>
            ))}
          </form>
          <form action="">
            <h2>Speeds</h2>
            {[...speeds].map((speed) => (
              <div>
                <input
                  onClick={() => speedFilter(speed)}
                  checked={filters.speed === speed}
                  type="radio"
                  id={speed}
                  name="speed"
                  value={speed}
                />
                 <label htmlFor={speed}>{speed}</label>
              </div>
            ))}
          </form>
          <form action="">
            <h2>Price</h2>

            <div>
              <input
                onClick={() => priceFilter("under $300")}
                checked={filters.price === "under $300"}
                type="radio"
                id="300"
                name="price"
                value="300"
              />
               <label htmlFor="300">under $300</label>
            </div>
            <div>
              <input
                onClick={() => priceFilter("$300-$500")}
                checked={filters.price === "$300-$500"}
                type="radio"
                id="500"
                name="price"
                value="500"
              />
               <label htmlFor="500">$300 - 500</label>
            </div>
            <div>
              <input
                onClick={() => priceFilter("$500 - $700")}
                checked={filters.price === "$500 - $700"}
                type="radio"
                id="700"
                name="price"
                value="700"
              />
               <label htmlFor="700">$500 - 700</label>
            </div>
            <div>
              <input
                onClick={() => priceFilter("$800+")}
                checked={filters.price === "$800+"}
                type="radio"
                id="800"
                name="price"
                value="800"
              />
               <label htmlFor="800">$800+</label>
            </div>
          </form>
        </div>
        <div className="Bikes-products">
          {displayBikes.map((bike) => (
            <Link to={`/bike/${bike.id}`}>
              <div key={bike.id} className="Bikes-card">
                <img src={`/img/bikes/${bike.image}`} />
                <span>{bike.title}</span>
                <span>${bike.price}</span>
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
}

export default Bikes;
