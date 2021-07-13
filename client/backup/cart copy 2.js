import * as api from "../api/index";
// user login check is managed in the front end
export const fetchCart = async (email) => {
  const res = await api.fetchCart(email);
  return res;

};

export const postCart = async (email, item) => {
  const res = await api.postCart(email, item);
  return res
};

export const deleteItem = async (email, item) => {
  const res = await api.deleteItem(email, item);
  return res
 
};

export const updateQuantity = async (email, item, action) => {
  
  const res = await api.updateQuantity(email, item, action);
  return res
 
};

// will want to create a method to delete/remove items from the shopping cart
