//// FOR HERE MUST USE RENDER AND NOT COMPONENT, FIGURE OUT HOW TO USE PROPS.PARAMS ON RENDER

import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
//import "./css/Slideshow.css";
import BikeData from "../bikes.json";
import ImgList from "../images.json";
import "./css/Bike.css";

function Bike(props) {
  const currId = props.match.params.id;
  const [size, setSize] = useState("Medium");
  //const [currId, setCurrId] = useState(props.match.params.id);

  /* useEffect(() => {
    setCurrId(props.match.params.id);
  }, []); */
  const currBike = BikeData.find((bike) => bike.id === Number(currId));
  const images = ImgList.filter((img) => img.includes(currId));
  const properties = {
    indicators: true,
    autoplay: false,

    indicators: (i) => (
      <div className="indicator">
        <img
          src={`/img/bikes/${images[i]}`}
          style={{ width: "80px", padding: "0 2px" }}
        />
      </div>
    ),
  };

  return (
    <div className="Bike">
      <div className="Bike-main">
        {/* <div className="Bike-main-img">
          <img src={`/img/bikes/${currImg}`} alt={currBike.subtitle} />
        </div> */}
        <div className="Bike-main-img-slide">
          <Slide easing="ease" {...properties}>
            {images.map((img) => (
              <div className="each-slide">
                <div
                  style={{
                    background: `no-repeat center center/100% url(/img/bikes/${img})`,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>
        <div className="Bike-main-content">
          <div className="Bike-main-content-header">
            <div>
              <h4>{currBike.title}</h4>
              <h2>{size}</h2>
            </div>
            <div>
              <h1>${currBike.price}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="Bike-details">
        <div className="Bike-nav"></div>
        <div className="Bike-info"></div>
      </div>
    </div>
  );
}

export default Bike;
