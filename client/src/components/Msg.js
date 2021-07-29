import React from "react";
import "./css/Msg.css";
const Msg = (props) => {
  return (
    <div className="Msg">
      <span>{props.initMsg}</span>
    </div>
  );
};

export default Msg;
