//// FOR HERE MUST USE RENDER AND NOT COMPONENT, FIGURE OUT HOW TO USE PROPS.PARAMS ON RENDER

import React, { useState } from "react";
import { Slide } from "react-slideshow-image";
import { useHistory } from "react-router-dom";
import { postCart } from "../actions/cart";
//import "./css/Slideshow.css";
import BikeData from "../bikes.json";
import ImgList from "../images.json";
import "./css/Bike.css";

function Bike(props) {
  const history = useHistory();
  const currId = props.match.params.id;
  const sizes = ["SMALL", "MEDIUM", "LARGE", "X-LARGE"];
  const bikeNav = ["DETAILS", "SPECS", "SIZING", "WARRANTY"];
  const [size, setSize] = useState("MEDIUM");
  const [currInfo, setCurrInfo] = useState("DETAILS");

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
          alt={images[i]}
        />
      </div>
    ),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, price, id, image } = currBike;
    const bikeSize = size;
    //check to see if user is loggied in
    if (localStorage.getItem("userProfile")) {
      const { email } = props.user.result;

      // post the item to he users carts

      const res = await postCart(
        { email },
        { title, price, id, bikeSize, image }
      );
      props.setItems(res.data.items);
    } else {
      if (props.items.length < 1) {
        const item = { title, price, id, bikeSize, image, quantity: 1 };

        localStorage.setItem("localCart", JSON.stringify([item]));
      } else {
        const item = { title, price, id, bikeSize, image };
        const prevItems = JSON.parse(localStorage.getItem("localCart"));

        // check to see if the item already exists in the array
        const bikeExists = prevItems.filter(
          (bike) => bike.id === item.id && bike.bikeSize === item.bikeSize
        );
        if (bikeExists.length > 0) {
          // do something

          //const newNum = (bikeExists[0].quantity += 1);
          let foundIndex = prevItems.findIndex(
            (x) => x.id === item.id && x.bikeSize === item.bikeSize
          );
          prevItems[foundIndex].quantity += 1;

          localStorage.setItem("localCart", JSON.stringify(prevItems));
          // modify the quantity of the existing bike in the cart array
        } else {
          // item does not exist in the array and shall be pushed to the localCart cart
          console.log("the item does not exist!");
          const newBike = { ...item, quantity: 1 };
          prevItems.push({ ...newBike });

          localStorage.setItem("localCart", JSON.stringify(prevItems));
        }
      }
      props.setItems(JSON.parse(localStorage.getItem("localCart")));
    }
  };

  return (
    <div className="Bike">
      <div className="Bike-main">
        <div className="img-slide">
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
        <div className="content">
          <div className="content-header">
            <div>
              <h4>{currBike.title}</h4>
              <h2>{size}</h2>
            </div>
            <div>
              <h1>${currBike.price}</h1>
            </div>
          </div>
          <div className="content-size">
            <span>Size:</span>
            <ul>
              {sizes.map((s) => (
                <li
                  className={`${s === size && "btn-active"} btn`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <button className="btn-cart" onClick={handleSubmit}>
            ADD TO <i className="fas fa-shopping-cart"></i>
          </button>
          <div className="content-highlights">
            <div>
              <h2>Highlights: </h2>
            </div>
            <div>
              <ul>
                {currBike.highlights.map((det) => (
                  <li>{det}</li>
                ))}
              </ul>
            </div>
            <div className="warranty">
              <div>
                <span>
                  <i className="fas fa-tools"></i>
                </span>
                <p>Choose to Have Your Bike Delivered Fully Built</p>
              </div>
              <div>
                <span>
                  <i className="fas fa-truck"></i>
                </span>
                <p>30 Day Free Returns</p>
              </div>
              <div>
                <span>
                  <i className="fas fa-trophy"></i>
                </span>
                <p> Lifetime Frame and Fork Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Bike-details">
        <div className="Bike-nav">
          <ul>
            {bikeNav.map((nav) => (
              <li
                className={`${currInfo === nav ? "nav-active" : ""}`}
                onClick={() => setCurrInfo(nav)}
              >
                {nav}
              </li>
            ))}
          </ul>
        </div>
        <div className="Bike-info">
          <div
            className="details"
            style={{ display: `${currInfo === bikeNav[0] ? "block" : "none"}` }}
          >
            <h2>{currBike.title}</h2>
            <p>{currBike.details}</p>
          </div>
          <div
            className="specs"
            style={{ display: `${currInfo === bikeNav[1] ? "block" : "none"}` }}
          >
            <h3>{currBike.subtitle}</h3>
            <ul>
              {Object.entries(currBike.specs).map(([key, value]) => (
                <li>
                  <span>
                    <strong>{key}:</strong>
                  </span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="sizing"
            style={{ display: `${currInfo === bikeNav[2] ? "block" : "none"}` }}
          >
            <p>
              Everybody's size is different - it's always best to measure your
              inseam before deciding what size is best.
            </p>
            <div className="sizing-menu">
              <div className="btn-sizing" onClick={() => setSize("SMALL")}>
                <h2>SMALL</h2>
                <p>For riders 5'6" to 5'9"</p>
              </div>
              <div className="btn-sizing" onClick={() => setSize("MEDIUM")}>
                <h2>MEDIUM</h2>
                <p>For riders 5'8" to 5'10"</p>
              </div>
              <div className="btn-sizing" onClick={() => setSize("LARGE")}>
                <h2>LARGE</h2>
                <p>For riders 5'10" to 6'</p>
              </div>
              <div className="btn-sizing" onClick={() => setSize("X-LARGE")}>
                <h2>X-LARGE</h2>
                <p>For riders 6' to 6'2"</p>
              </div>
            </div>
          </div>
          <div
            className="warranty"
            style={{ display: `${currInfo === bikeNav[3] ? "block" : "none"}` }}
          >
            <h2>The best warranty in the business</h2>
            <p>
              We believe in our bikes and we believe you should be able to enjoy
              riding without sweating the small stuff - that’s why we’ve got
              your back! With a lifetime warranty on frames and a 1-year
              warranty on components, you can ride confidently with the
              knowledge that we’ve got you covered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bike;
