import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { signup, signin } from "../../actions/index";
import "../css/Auth.css";
const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth(props) {
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);

  function googleFailure(error) {
    console.log(error);
    console.log("Google Sign in unsuccessfull, try again later.");
  }

  async function googleSuccess(res) {
    // using res?.profileObj will NOT return an error if doesnt work, special character is ?.
    const result = res?.profileObj; // this will make res = undefined RATHER THAN throwing an error making res unusable
    const token = res?.tokenId;

    try {
      // dispatch({ type: "AUTH", data: { result, token } });
      console.log(result, token);
    } catch (error) {
      console.log(error);
    }
  }

  // use this to update the formData state upon clicking submit
  function handleSubmit(e) {
    e.preventDefault();
    // check if user is signin or signed out
    if (isSignup) {
      console.log("YOU ARE CREATING AN ACCOUNT");
      //need to set user here somehow

      signup(formData, history);
    } else {
      console.log("YOU ARE SIGNING IN");
      signin(formData, history);
    }
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function switchMode(e) {
    e.preventDefault();
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
  }
  return (
    <div
      className="Auth"
      style={{
        background: 'no-repeat center/cover url("/img/account/account_bg.jpg")',
      }}
    >
      <div className="form-container">
        <h1>{isSignup ? "CREATE AN ACCOUNT" : "SIGN IN"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-border">
            <i className="far fa-envelope"></i>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter Email"
            />
          </div>
          <div className="form-border">
            {" "}
            <i className="fas fa-lock"></i>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter Password"
            />
            <button
              className="btn-display"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
          {isSignup && (
            <div className="form-border">
              <i className="fas fa-lock"></i>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                autoComplete="off"
                placeholder="Confirm Password"
              />
            </div>
          )}

          <button className="btn-action">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
          <GoogleLogin
            clientId="972929890931-voaki6ilp7dhs29c177f57im8q4g1ise.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="btn-action google-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <i className="fab fa-google"></i>&nbsp; Login With Google
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <button onClick={switchMode} className="btn-switch">
            {isSignup
              ? "Already hanve an account? Sign In"
              : "Don't have an account? Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
