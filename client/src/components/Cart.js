import React, { useEffect, useState } from "react";
import { fetchCart } from "../api/index";
import "./css/Cart.css";
// have to figure out a way to handle quantity

function Cart() {
  const [items, setItems] = useState([
    {
      title: "",
      image: "",
      id: "",
      bikeSize: "",
      price: null,
    },
  ]);
  const [total, setTotal] = useState(0);
  useEffect(async () => {
    // will want to handle error if no items are in cart
    const res = await fetchCart();

    setItems(res.data);
    // calculate total price here
  }, []);
  useEffect(() => {
    setTotal(calcTotal(items));
  }, [items]);

  function calcTotal(arr) {
    let total = 0;
    console.log(items);
    arr.forEach((element) => {
      total += element.price;
    });
    return total;
  }

  return (
    <div className="Cart">
      <div className="Cart-items">
        {items.map((item) => (
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
        ))}
      </div>
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
