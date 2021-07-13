import React from "react";
import "./css/Checkout.css";
const Checkout = (props) => {
  return (
    <div
      className="Checkout"
      style={{
        background: ' no-repeat center/cover url("/img/checkout/checkout.jpg")',
      }}
    >
      <h1>Thank you for using our shop!</h1>
    </div>
  );
};

export default Checkout;
