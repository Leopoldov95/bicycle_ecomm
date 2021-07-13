import React, { useState, useEffect } from "react";
import "./App.css";
import { useHistory, useLocation, Route, Switch } from "react-router-dom";
import decode from "jwt-decode";
import { fetchCart, postCart } from "./api/index";
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
  const [fetch, setFetch] = useState(true);
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
    // so this will only be triggered once the user logs in
    if (user && fetch) {
      console.log("there is a user!!!");
      setFetch(false);
      /*  const { email } = user.result;
      // if user logs in and item exists, add them to the user's cart db
      if (items.length > 0) {
        console.log("I was triggered by changes to user");

        const result = await fetchCart({ email });
        const dbItems = result.data.items;

        // so gather the current items in the db, then add the new items to them when user logs in...
        // messy method

        for (let bike of items) {
          if (dbItems && dbItems.length > 1) {
            const filtered = dbItems.filter(
              (dbItem) =>
                dbItem.id === bike.id && dbItem.bikeSize === bike.bikeSize
            );

            // if filtered is true, then item exists
            if (filtered.length > 0) {
              let foundIndex = dbItems.findIndex(
                (x) =>
                  x.id === filtered[0].id && x.bikeSize === filtered[0].bikeSize
              );

              dbItems[foundIndex].quantity += bike.quantity;
              //dbItems[dbItems.indexOf(filtered)].quantity += bike.quantity;

              // else if filtered is 0, then item in localCart does not exist in db cart
            }
          } else {
            // push item to db cart
            dbItems.push(bike);
          }
        }

        // check if database ALREADY contains the item, if so, increase it's quantity

        // else, add it as a new item to the database

        const newItems = await postCart(email, dbItems);
        // set the localCart local storage to the NEW db item set
        localStorage.setItem("localCart", JSON.stringify(newItems.data.items));
        setItems(JSON.parse(localStorage.getItem("localCart")));
      } else {
        const result = await fetchCart({ email });
        const dbItems = result.data.items;
        if (dbItems && dbItems.length > 0) {
          localStorage.setItem("localCart", JSON.stringify(dbItems));
          setItems(JSON.parse(localStorage.getItem("localCart")));
        }
      } */
      // if user logs in and once all local items have been stored in the users db, fetch their items and set them to the current items state
    }
  }, [user]);

  useEffect(() => {
    if (initMsg) {
      setTimeout(() => {
        setInitMsg(false);
      }, 3000);
    }
  }, [initMsg]);
  useEffect(async () => {
    if (items && items.length > 0) {
      setTotal(calcTotal(items));

      setItemNum(showTotalItems(items));
      // so anytime changes are made to the items, they should be applied to the db
    } else {
      setTotal(0);
      setItemNum(0);
    }
  }, [items]);
  const calcTotal = (arr) => {
    if (items) {
      if (items.length > 0) {
        let total = 0;

        arr.forEach((element) => {
          total += element.price * element.quantity;
        });

        return total;
      }
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
    setFetch(true);
    localStorage.clear();
    setItems([]);
    setTotal(0);
    setItemNum(0);
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
