import React, { useState, useEffect } from "react";
import "./App.css";
import { useHistory, useLocation, Route, Switch } from "react-router-dom";
import decode from "jwt-decode";
import { fetchCart } from "./api/index";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Bikes from "./components/Bikes";
import Bike from "./components/Bike";
import Msg from "./components/Msg";
import Cart from "./components/Cart";
import Auth from "./components/auth/Auth";
import Unkown from "./components/Unkown";
import Checkout from "./components/Checkout";

// App will serve as the master management
const App = () => {
  const location = useLocation();
  const history = useHistory();
  const [total, setTotal] = useState(0);

  const [items, setItems] = useState([]);
  const [initMsg, setInitMsg] = useState(false);
  const [itemNum, setItemNum] = useState(0);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );

  useEffect(() => {
    if (localStorage.getItem("localCart")) {
      setItems(JSON.parse(localStorage.getItem("localCart")));
    } else {
      setItemNum(0);
    }
  }, []);

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

  useEffect(async () => {
    if (user) {
      const { email } = user.result;
      const res = await fetchCart({ email });
      if (items) {
        // if items already exist, add them to the local cart
        console.log("there are items in the cart!");
      }
      // setItems(res.data.items);
      //setItemNum(showTotalItems(items));
    }
  }, [user]);

  useEffect(() => {
    if (initMsg) {
      setTimeout(() => {
        setInitMsg(false);
      }, 3000);
    }
  }, [initMsg]);
  useEffect(() => {
    if (items) {
      setTotal(calcTotal(items));

      setItemNum(showTotalItems(items));
    }
  }, [items]);
  const calcTotal = (arr) => {
    if (items) {
      let total = 0;

      arr.forEach((element) => {
        total += element.price * element.quantity;
      });

      return total;
    }
  };

  const showTotalItems = (arr) => {
    if (items) {
      let total = 0;
      for (let item of arr) {
        total += item.quantity;
      }
      return total;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="App">
      <Navbar
        user={user}
        setUser={setUser}
        setInitMsg={setInitMsg}
        itemNum={itemNum}
      />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/bikes" exact component={Bikes} />
        <Route
          path="/bikes/:id"
          exact
          render={(props) => (
            <Bike
              {...props}
              user={user}
              setUser={setUser}
              items={items}
              setItems={setItems}
            />
          )}
        />
        <Route
          path="/auth"
          exact
          render={(props) => <Auth user={user} setUser={setUser} />}
        />
        <Route
          path="/cart"
          exact
          render={(props) => (
            <Cart
              user={user}
              setUser={setUser}
              setItemNum={setItemNum}
              total={total}
              items={items}
              setItems={setItems}
            />
          )}
        />
        <Route path="*" component={Unkown} />
      </Switch>
      {initMsg && <Msg />}
      <Footer />
    </div>
  );
};

export default App;