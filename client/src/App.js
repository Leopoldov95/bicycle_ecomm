import React, { useState, useEffect } from "react";
import "./App.css";
import { useHistory, useLocation, Route, Switch } from "react-router-dom";
import decode from "jwt-decode";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Bikes from "./components/Bikes";
import Bike from "./components/Bike";

import Cart from "./components/Cart";
import Auth from "./components/auth/Auth";

// App will serve as the master management
function App() {
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );
  useEffect(() => {
    const token = user?.token;

    // JWT ...
    if (token) {
      // decodes the token, checking if tken is expired. If so, user must sign back in
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("userProfile")));
  }, [location]);
  const logout = () => {
    setUser(null);
    history.push("/");
  };

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/bikes" exact component={Bikes} />
        <Route
          path="/bikes/:id"
          exact
          render={(props) => <Bike {...props} />}
        />
        <Route
          path="/auth"
          exact
          render={(props) => <Auth user={user} setUser={setUser} />}
        />
        <Route path="/cart" exact component={Cart} />
        <Route path="*" render={() => <h1>Sorry, page not found</h1>} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
