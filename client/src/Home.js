import React from "react";
import "./Home.css";
import Slideshow from "./Slideshow";
import "react-slideshow-image/dist/styles.css";

function Home() {
  return (
    <div className="Home">
      <Slideshow />
    </div>
  );
}

export default Home;
