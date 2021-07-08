import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchCart, postCart } from "../actions/cart";
//import { fetchCart } from "../api/index";
import "./css/Cart.css";
// have to figure out a way to handle quantity

function Cart(props) {
  const itemProps = {
    title: "",
    image: "",
    id: "",
    bikeSize: "",
    price: null,
  };
  // this will manage the main shopping cart for the logged in user
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(async () => {
    // will want to handle error if no items are in cart
    if (props.user) {
      const { email } = props.user.result;
      const res = await fetchCart({ email });
      console.log(res);
      setItems(res.data);
      // calculate total price here
    }
  }, []);
  /*   useEffect(() => {
    if (items) {
      setTotal(calcTotal(items));
    }
  }, [items]);

  function calcTotal(arr) {
    let total = 0;

    arr.forEach((element) => {
      total += element.price;
    });
    return total;
  }
 */
  return (
    <div className="Cart">
      {props.user ? (
        <div className="Cart-items">
          {items.length > 0 ? (
            items.map((item) => (
              <div className="item" key={item.id}>
                <div className="item-info">
                  <div>
                    <img src={`/img/bikes/${item.image}`} />
                  </div>
                  <div>
                    <h2>{item.title}</h2>
                    <span>{item.bikeSize}</span>
                  </div>
                </div>
                <div className="item-quantity"></div>
                <div className="item-price"></div>
              </div>
            ))
          ) : (
            <div>
              <h1>Your shopping cart is empty</h1>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>You must be logged in to view the shopping cart</h1>
        </div>
      )}

      <div className="Cart-price">
        <h2>Cart Summary</h2>
        <div>
          <h1>Total</h1>
          <h1>
            <span>${total}</span>
          </h1>
        </div>
        <button>Check Out</button>
      </div>
    </div>
  );
}

export default Cart;
