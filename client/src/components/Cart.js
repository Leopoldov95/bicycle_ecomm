import React from "react";
import { Link } from "react-router-dom";
import {  updateQuantity, deleteItem } from "../actions/cart";
// may want to use post cart to update item quantity, as item ALREADY exists in the cart, we may simply change the quantity
//import { fetchCart } from "../api/index";
import "./css/Cart.css";
// have to figure out a way to handle quantity

const Cart = (props) => {

  const handleDelete = async (item) => {
    const { email } = props.user.result;
    const { id, bikeSize } = item;
    const res = await deleteItem({ email }, { id, bikeSize });
    props.setItems(res.data.items);
  };
  const handleQuantity = async (item, action) => {
    let res;
    const { email } = props.user.result;
    const { id, bikeSize } = item;
    // if item will be decreased from 1 to 0, delete it
    if (item.quantity === 1 && action === 'minus') {
      res = await deleteItem({ email }, { id, bikeSize });
    } else {
   
    
    res = await updateQuantity({ email }, { id, bikeSize }, action);
    }
   
    props.setItems(res.data.items);
  };
  return (
    <div className="Cart">
      {props.user ? (
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
      ) : (
        <div className="msg">
          <h1>You must be logged in to view the shopping cart</h1>
        </div>
      )}

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
