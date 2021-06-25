import React from "react";
import { Link } from "react-router-dom";
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
          {BikeData.map(
            (bike) =>
              bike.best === true && (
                <Link to={`/bikes/${bike.id}`}>
                  <div key={bike.subtitle} className="card-main">
                    <img src={`/img/bikes/${bike.image}`} alt={bike.subtitle} />
                    <div className="card-main-content">
                      <h4>{bike.subtitle}</h4>
                      <span>${bike.price}</span>
                    </div>
                    <div className="card-main-shop">
                      <span>View Bicycle</span>
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
