import React from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "./Slideshow.css";

const slideImages = [
  "/img/home/home_main.jpg",
  "/img/home/home_gear.jpg",
  "/img/home/home_beach.jpg",
];

const properties = {
  indicators: true,
  autoplay: false,
};
const Slideshow = () => {
  return (
    <div>
      <Slide easing="ease" {...properties}>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[0]})` }}>
            <div>
              <h2>Find Your Next Bike Here</h2>
              <button className="btn">Shop Bikes</button>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[1]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[2]})` }}>
            <div>
              <h2>Learn More About Us</h2>
              <Link to='/about'>
                  <button className="btn">About Us</button>
              </Link>
            
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Slideshow;
