import React, { useState, useEffect } from "react";
import BikeData from "../bikes.json";
import "./css/Bike.css";

function Bike(props) {
  const [currId, setCurrId] = useState(null);
  const [currBike, setCurrBike] = useState(null);
  useEffect(() => {
    setCurrId(props.match.params.id);
  }, []);

  useEffect(() => {
    setCurrBike(BikeData.find((bike) => bike.id === Number(currId)));
  }, [currId]);

  console.log(currId, currBike);
  return <h1>This is the individual bike page</h1>;
}

export default Bike;
