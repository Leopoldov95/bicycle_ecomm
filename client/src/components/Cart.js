import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import { fetchCart, updateQuantity, deleteItem } from "../actions/cart";
// may want to use post cart to update item quantity, as item ALREADY exists in the cart, we may simply change the quantity
//import { fetchCart } from "../api/index";
import "./css/Cart.css";
// have to figure out a way to handle quantity

const Cart = (props) => {

  // this will manage the main shopping cart for the logged in user
  //const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(async () => {
    // will want to handle error if no items are in cart
    if (props.user) {
      const { email } = props.user.result;
      const res = await fetchCart({ email });
      setItems(res.data.items);
      props.setItemNum(res.data.quantity);
      // calculate total price here
    }
  }, []);
  useEffect(() => {
    if (items) {
      setTotal(calcTotal(items));
    }
  }, [items]);

  const calcTotal = (arr) => {
 
    let total = 0;

    arr.forEach((element) => {
      total += (element.price * element.quantity);
    });
    
    return total;
  };

  const handleDelete = (item) => {
    const { email } = props.user.result;
    const { id, bikeSize } = item;
    deleteItem({ email }, { id, bikeSize });
  };
  const handleQuantity = async (item, action) => {
    const { email } = props.user.result;
    const { id, bikeSize } = item;
   const res =  await updateQuantity({ email }, { id, bikeSize }, action);
   setItems(res.data.items)

  };
  return (
    <div className="Cart">
      {props.user ? (
        <div className="Cart-items">
          {items ? (
            items.map((item) => (
              <div className="item" key={`${item.id}-${item.bikeSize}`}>
                <div className="item-info">
                  <div>
                    <img src={`/img/bikes/${item.image}`} />
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <span>{item.bikeSize}</span>
                  </div>
                </div>
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
            <span style={{color: '#04a9a7'}}>${total}</span>
          </h1>
        </div>
        <button>Check Out</button>
      </div>
    </div>
  );
};

export default Cart;
