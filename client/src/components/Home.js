import React from "react";
import "./css/Home.css";
import Slideshow from "./Slideshow";
import BikeData from "../bikes.json";
import "react-slideshow-image/dist/styles.css";

function Home() {
  return (
    <div className="Home">
      <Slideshow />
      <div className="Home-best">
        <h2>Best Selling Bicycles</h2>
        <div className="Home-cards">
          {BikeData.map((bike) => {
            if (bike.best === true) {
              <div className="card-main">
                <img src="/img/bikes/{bike.image}" alt={bike.subtitle} />
                <div className="card-main-content">
                  <h4>{bike.subtitle}</h4>
                  <span>${bike.price}</span>
                </div>
                <div className="card-main-shop">
                  <span>View Bicycle</span>
                </div>
              </div>;
            }
          })}
          {/* <div className="card-main">
            <img src="/img/bikes/bonnette_02.jpeg" alt="bonnette_bike" />
            <div className="card-main-content">
              <h4>Bonnette Bike</h4>
              <span>$749.99</span>
            </div>
            <div className="card-main-shop">
              <span>View Bicycle</span>
            </div>
          </div>
          <div className="card-main">
            <img src="/img/bikes/comm_02.jpeg" alt="commuter_bike" />
            <div className="card-main-content">
              <h4>Commune Bike</h4>
              <span>$599.99</span>
            </div>
            <div className="card-main-shop">
              <span>View Bicycle</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
