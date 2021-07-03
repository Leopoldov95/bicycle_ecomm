import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchUser } from "../../api/index";
import "../css/User.css";
function User() {
  const [input, setInput] = useState({
    email: "",
    password: "",
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
    };
    fetchUser(user);
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
        <h1>LOGIN</h1>
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
          <button onClick={handleSubmit}>Login</button>
          <Link className="link" to="/register">
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default User;
