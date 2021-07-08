import * as api from "../api/index";
// user login check is managed in the front end
export const fetchCart = async (email) => {
  const res = await api.fetchCart(email);
  return res;

  // first look to see if user has a cart activated
  // if empty, show that it is empty
};

export const postCart = async (email, item) => {
  const res = await api.postCart(email, item);
  console.log(res);
  // check if user has a shopping cart
  // if user has no shopping cart, then create on for them
  // check if item already exists, if it does, simply increase by 1
  // else, create a new item in the cart array
  // add cart quantity by one
};

// will want to create a method to delete/remove items from the shopping cart
