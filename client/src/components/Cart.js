import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// may want to use post cart to update item quantity, as item ALREADY exists in the cart, we may simply change the quantity

import "./css/Cart.css";
// have to figure out a way to handle quantity

const Cart = (props) => {
  const history = useHistory();
  const [err, setErr] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setErr(null);
    }, 3000);
  }, [err]);
  const handleDelete = async (item) => {
    const currItems = props.items;
    const filtered = currItems.filter((bike) => {
      if (bike.id !== item.id || bike.bikeSize !== item.bikeSize) {
        return bike;
      }
    });

    await props.handleUpdates(filtered);
  };
  const handleQuantity = async (item, action) => {
    // if item will be decreased from 1 to 0, delete it
    if (item.quantity === 1 && action === "minus") {
      // res = await deleteItem({ email }, { id, bikeSize });
      handleDelete(item);
    } else {
      // const prevItems = JSON.parse(localStorage.getItem("localCart"));
      const prevItems = props.items;
      let foundIndex = prevItems.findIndex(
        (x) => x.id === item.id && x.bikeSize === item.bikeSize
      );

      if (action === "plus") {
        prevItems[foundIndex].quantity += 1;
      } else if (action === "minus") {
        prevItems[foundIndex].quantity -= 1;
      }
      await props.handleUpdates(prevItems);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (props.user) {
      history.push("/checkout");
    } else {
      setErr("You must be logged in to checkout");
    }
  };
  return (
    <div className="Cart">
      <div className="Cart-items">
        {props.items ? (
          props.items.map((item) => (
            <div className="item" key={`${item.id}-${item.bikeSize}`}>
              <Link to={`/bikes/${item.id}`}>
                <div className="item-info">
                  <div>
                    <img src={`/img/bikes/${item.image}`} alt={item.title} />
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <span>{item.bikeSize}</span>
                  </div>
                </div>
              </Link>

              <div className="item-quantity">
                <span
                  onClick={() => handleQuantity(item, "minus")}
                  className="item-toggle"
                >
                  <i className="fas fa-minus"></i>
                </span>
                <span>{item.quantity}</span>
                <span
                  onClick={() => handleQuantity(item, "plus")}
                  className="item-toggle"
                >
                  <i className="fas fa-plus"></i>
                </span>
              </div>
              <div className="item-price">
                <span style={{ color: "#04a9a7" }}>
                  ${item.price * item.quantity}
                </span>
                <span
                  className="item-toggle"
                  onClick={() => handleDelete(item)}
                >
                  <i className="fas fa-trash-alt"></i>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="msg">
            <h1>Your shopping cart is empty</h1>
          </div>
        )}
      </div>

      <div className="Cart-price">
        <h2>Cart Summary</h2>
        <div>
          <h1>Total</h1>
          <h1>
            <span style={{ color: "#04a9a7" }}>${props.total}</span>
          </h1>
        </div>

        <button onClick={handleCheckout}>Check Out</button>
        {err && <span style={{ color: "red" }}>{err}</span>}
      </div>
    </div>
  );
};

export default Cart;
