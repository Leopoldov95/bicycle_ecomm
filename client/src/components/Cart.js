import React from "react";
import { Link } from "react-router-dom";
import { postCart } from "../actions/cart";
// may want to use post cart to update item quantity, as item ALREADY exists in the cart, we may simply change the quantity
//import { fetchCart } from "../api/index";
import "./css/Cart.css";
// have to figure out a way to handle quantity

const Cart = (props) => {
  const handleDelete = async (item) => {
    const currItems = props.items;
    const filtered = currItems.filter((bike) => {
      if (bike.id !== item.id || bike.bikeSize !== item.bikeSize) {
        return bike;
      }
    });

    //localStorage.setItem("localCart", JSON.stringify(filtered));

    // props.setItems(filtered);
    await props.handleUpdates(filtered);
    /*  if (localStorage.getItem("localCart")) {
      localStorage.setItem("localCart", JSON.stringify(props.items));
      props.setItems(JSON.parse(localStorage.getItem("localCart")));
    }
    if (props.user) {
      // post changes to db cart
      console.log("I was triggered by changes the Cart delete button");
      const { email } = props.user.result;
      const newItems = props.items;
      const result = await postCart(email, newItems);
      props.setItems(result.data.items);

      // need to update the items here, otherwise website won't update!
    } */
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

        // localStorage.setItem("localCart", JSON.stringify(prevItems));
        //props.setItems(prevItems);
      } else if (action === "minus") {
        prevItems[foundIndex].quantity -= 1;

        //localStorage.setItem("localCart", JSON.stringify(prevItems));

        //props.setItems(prevItems);
      }
      await props.handleUpdates(prevItems);
      // res = await updateQuantity({ email }, { id, bikeSize }, action);
    }

    /* if (localStorage.getItem("localCart")) {
      localStorage.setItem("localCart", JSON.stringify(props.items));
      props.setItems(JSON.parse(localStorage.getItem("localCart")));
    }
    if (props.user) {
      // post changes to db cart
      console.log("I was triggered by changes the Cart delete button");
      const { email } = props.user.result;
      const newItems = props.items;
      const result = await postCart(email, newItems);
      props.setItems(result.data.items);

      // need to update the items here, otherwise website won't update!
    } */
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
                    <img src={`/img/bikes/${item.image}`} />
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
        <button>Check Out</button>
      </div>
    </div>
  );
};

export default Cart;
