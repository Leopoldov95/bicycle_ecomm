import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchUser } from "../../api/index";
import { GoogleLogin } from "react-google-login";
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

  function googleFailure(error){
    console.log(error);
    console.log("Google Sign in unsuccessfull, try again later.");
  }

  async function googleSuccess(res){
// using res?.profileObj will NOT return an error if doesnt work, special character is ?.
const result = res?.profileObj; // this will make res = undefined RATHER THAN throwing an error making res unusable
const token = res?.tokenId;

try {
 // dispatch({ type: "AUTH", data: { result, token } });
 console.log(result, token)
} catch (error) {
  console.log(error);
}
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
          <GoogleLogin clientId="972929890931-voaki6ilp7dhs29c177f57im8q4g1ise.apps.googleusercontent.com" 
          
          render={(renderProps) => (
          <button  className='google-btn'  onClick={renderProps.onClick}
          disabled={renderProps.disabled}><i className="fab fa-google"></i>&nbsp; Login With Google</button>
          )}
           onSuccess={googleSuccess}
           onFailure={googleFailure}
           cookiePolicy="single_host_origin"
          /> 
         
          <Link className="link" to="/register">
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default User;
