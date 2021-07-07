import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postUser } from "../../api/index";

import "../css/User.css";

function Register() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    id: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: input.email,
      password: input.password,
      passwordConfirmation: input.passwordConfirmation,
    };

    postUser(user);
    // make sure to clear the input here as well
  }

  return (
    <div
      className="User"
      style={{
        background: 'no-repeat center/cover url("/img/account/account_bg.jpg")',
      }}
    >
      <div className="form-container">
        <h1>CREATE AN ACCOUNT</h1>
        <form>
          <div className="form-border">
            <i className="far fa-envelope"></i>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={input.email}
              autoComplete="off"
              placeholder="Enter Email"
            />
          </div>
          <div className="form-border">
            <i className="fas fa-lock"></i>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={input.password}
              autoComplete="off"
              placeholder="Enter Password"
            />
          </div>
          <div className="form-border">
            <i className="fas fa-lock"></i>
            <input
              name="passwordConfirmation"
              type="password"
              onChange={handleChange}
              value={input.passwordConfirmation}
              autoComplete="off"
              placeholder="Confirm Password"
            />
          </div>
          <button onClick={handleSubmit}>Create Account</button>
          <Link className="link" to="/login">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
