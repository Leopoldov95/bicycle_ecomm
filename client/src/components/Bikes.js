import React, { useState } from "react";
import { Link } from "react-router-dom";
import BikeData from "../bikes.json";
import "./css/Bikes.css";
function Bikes() {
  const [showFilter, setShowFilter] = useState(true);

  function handleFilter() {
    setShowFilter(!showFilter);
  }

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
  const styles = handleStyles();
  const speeds = handleSpeed();
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
          Every Bicycle Comes With <span>Lifetime Warranty</span>
        </p>
      </div>
      <div className="Bikes-header">
        <div className="Bikes-filter">
          <button onClick={handleFilter}>
            <i className="fas fa-sliders-h"></i>
          </button>
          <span>{showFilter ? "Hide Filters" : "Show Filters"}</span>
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
                <input type="radio" id={style} name="style" value={style} /> 
                <label htmlFor={style}>{style}</label>
              </div>
            ))}
          </form>
          <form action="">
            <h2>Speeds</h2>
            {[...speeds].map((speed) => (
              <div>
                <input type="radio" id={speed} name="speed" value={speed} /> 
                <label htmlFor={speed}>{speed}</label>
              </div>
            ))}
          </form>
          <form action="">
            <h2>Price</h2>

            <div>
              <input type="radio" id="300" name="price" value="300" /> 
              <label htmlFor="300">under $300</label>
            </div>
            <div>
              <input type="radio" id="500" name="price" value="500" /> 
              <label htmlFor="500">$300 - 500</label>
            </div>
            <div>
              <input type="radio" id="700" name="price" value="700" /> 
              <label htmlFor="700">$700 - 800</label>
            </div>
            <div>
              <input type="radio" id="800" name="price" value="800" /> 
              <label htmlFor="800">$800+</label>
            </div>
          </form>
        </div>
        <div className="Bikes-products">
          {BikeData.map((bike) => (
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
