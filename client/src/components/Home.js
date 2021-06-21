import React from "react";
import "./Home.css";
import Slideshow from "./Slideshow";
import "react-slideshow-image/dist/styles.css";

function Home() {
  return (
    <div className="Home">
      <Slideshow />
      <div className="Home-best">
        <h2>Best Selling Bicycles</h2>
        <div className="Home-cards">
          <div className="card-main">
            <img src="/img/bikes/bonnette_02.jpeg" />
            <div className='card-main-content'>
              <h4>Bonnette Bike</h4>
              <span>$749.99</span>
            </div>
            <div className='card-main-shop'>
              <span>Add To Cart <i className="fas fa-shopping-cart"></i></span>
            </div>
          </div>
          <div className="card-main">
            <img src="/img/bikes/comm_02.jpeg" />
            <div className='card-main-content'>
              <h4>Commune Bike</h4>
              <span>$599.99</span>
            </div>
            <div className='card-main-shop'>
              <span>Add To Cart <i className="fas fa-shopping-cart"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
