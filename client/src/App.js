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
import Unknown from "./components/Unknown";
import Checkout from "./components/Checkout";

// App will serve as the master management
const App = () => {
  const location = useLocation();
  const history = useHistory();
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [initMsg, setInitMsg] = useState('');
  const [cartMsg, setCartMsg] = useState(false);
  const [itemNum, setItemNum] = useState(0);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );

  useEffect(() => {
    // if no user is present, initialize the localCart
    if (!user) {
      // this is needed to prevent localCart reset on page refresh
      if (!localStorage.getItem("localCart")) {
        setItems([]);
        localStorage.setItem("localCart", JSON.stringify(items));
        setItemNum(0);
      } else {
        setItems(JSON.parse(localStorage.getItem("localCart")));
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = user?.token;

    // JWT ...
    if (token) {
      // decodes the token, checking if tken is expired. If so, user must sign back in
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("userProfile"))); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const { email } = user.result;

        // if user logs in and item exists, add them to the user's cart db
        if (localStorage.getItem("localCart") && user) {
          const result = await fetchCart({ email });
          const dbItems = result.data.items;
          // so gather the current items in the db, then add the new items to them when user logs in...
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
                    x.id === filtered[0].id &&
                    x.bikeSize === filtered[0].bikeSize
                );

                dbItems[foundIndex].quantity += bike.quantity;
                // else if filtered is 0, then item in localCart does not exist in db cart
              } else {
                dbItems.push(bike);
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
          localStorage.removeItem("localCart"); // must remove the localStorage session to avoid issues with db
          await handleUpdates(newItems.data.items);
        } else {
          localStorage.removeItem("localCart"); // must remove the localStorage session to avoid issues with db
          const result = await fetchCart({ email });
          const dbItems = result.data.items;
          if (dbItems) {
            await handleUpdates(dbItems);
          } else {
            await handleUpdates([]);
          }
        }
      }
    }
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (initMsg) {
      setTimeout(() => {
        setInitMsg('');
      }, 3000);
    }
  }, [initMsg]);

  useEffect(() => {
    if (cartMsg) {
      setTimeout(() => {
        setCartMsg(false);
      }, 400);
    }
  }, [cartMsg]);

  // use this to make changes to the databses whenever there are changes to the items
  useEffect(() => {
    if (items && items.length > 0) {
      setTotal(calcTotal(items));
      setItemNum(showTotalItems(items));
    } else {
      setTotal(0);
      setItemNum(0);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
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
    localStorage.clear();
    setTotal(0);
    setItemNum(0);
    setItems([]);
    localStorage.setItem("localCart", JSON.stringify(items));
    history.push("/");
  };
  const handleUpdates = async (newItems) => {
    if (localStorage.getItem("localCart")) {
      localStorage.setItem("localCart", JSON.stringify(newItems));
      setItems(JSON.parse(localStorage.getItem("localCart")));
    } else if (user) {
      // post changes to db cart

      const { email } = user.result;
      const result = await postCart(email, newItems);
      setItems(result.data.items);
    }
  };
  return (
    <div className="App">
      <Navbar
        user={user}
        setUser={setUser}
        setInitMsg={setInitMsg}
        itemNum={itemNum}
        setItems={setItems}
        cartMsg={cartMsg}
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
              handleUpdates={handleUpdates}
              setCartMsg={setCartMsg}
            />
          )}
        />
        <Route
          path="/auth"
          exact
          render={(props) => <Auth user={user} setUser={setUser} setInitMsg={setInitMsg}/>}
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
              handleUpdates={handleUpdates}
              setCartMsg={setCartMsg}
            />
          )}
        />
        <Route
          path="/checkout"
          exact
          render={(props) => <Checkout {...props} user={user} />}
        />
        <Route path="*" component={Unknown} />
      </Switch>
      {initMsg && <Msg initMsg={initMsg} />}
      <Footer />
    </div>
  );
};

export default App;
