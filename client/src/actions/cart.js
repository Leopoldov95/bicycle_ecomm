import * as api from "../api/index";
// user login check is managed in the front end
export const fetchCart = async (email) => {
  const res = await api.fetchCart(email);
  return res;
};

export const postCart = async (email, item) => {
  const res = await api.postCart(email, item);
  return res;
};
