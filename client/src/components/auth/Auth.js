import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { signup, signin } from "../../actions/user";
import "../css/Auth.css";
const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [showErr, setShowErr] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);

  useEffect(() => {
    if (showErr) {
      setTimeout(() => {
        setShowErr(null);
      }, 2000);
    }
  }, [showErr]);

  const googleFailure = (error) => {
    console.log(error);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      const data = { result, token };

      localStorage.setItem("userProfile", JSON.stringify(data));
      props.setInitMsg('You Have Logged In!');
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  // use this to update the formData state upon clicking submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if user is signin or signed out
    if (isSignup) {
      setLoading(true)
      const result = await signup(formData, history);
      if (result) {
        console.log(result);
        setLoading(false)
        setShowErr(result);
      } else {
        setLoading(false)
        props.setInitMsg('Account Created!');
      }
    } else {
      setLoading(true)
      const result = await signin(formData, history);
      if (result) {
        setLoading(false)
        console.log(result);
      return  setShowErr(result);
      } else {
        setLoading(false)
        props.setInitMsg('You Have Logged In!');
      }
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = (e) => {
    e.preventDefault();
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
  };
  return (
    <div
      className="Auth"
      style={{
        background: 'no-repeat center/cover url("/img/account/account_bg.jpg")',
      }}
    >
      <div className="form-container">
        <h1>{isSignup ? "CREATE AN ACCOUNT" : "SIGN IN"}</h1>
        {loading && <div className='loader'>
          <img className='loader-img' src='img/account/loading.png' alt='load_png'/>
        </div>}
        {isSignup && !loading && <p className='password-message' style={{display: `${message ? 'block' : 'none'}`}}>Password must be greater than 5 characters, contain 1 Uppercase, 1 Special chracter (!@#$&*), and 1 number</p>}
        <span className={`form-error ${showErr ? "isError" : ""}`}>
          {showErr ? `${showErr}` : ""}
        </span>

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
          <div className="form-border" onBlur={()=>setMessage(false)} onFocus={()=>setMessage(true)}>
            <i className="fas fa-lock"></i>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter Password"
            />
            <span
              className="btn-display"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
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
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
