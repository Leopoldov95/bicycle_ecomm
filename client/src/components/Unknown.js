import React from "react";
import "./css/Unknown.css";
const Unknown = () => {
  return (
    <div
      className="Unknown"
      style={{
        background: ' no-repeat center/cover url("/img/404/broken_bike.jpg")',
      }}
    >
      <h1>We're sorry, the page you're looking for does not exist...</h1>
    </div>
  );
};

export default Unknown;
