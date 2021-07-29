import axios from "axios";

// so by using this url, we can use the backend logic
const API = axios.create({
  baseURL: "https://bicycleshop-api.herokuapp.com"
});
// this function will run on every request, it's helping the middleware function
API.interceptors.request.use((req) => {
  if (localStorage.getItem("userProfile")) {
    ////// due to how headers are handled, VAR NAMES AFTER req MUST BE IN LOWERCASE ///////
    // name of a property must match!!! Authorization !== authorization
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userProfile")).token
    }`;
  }

  return req;
});

export const fetchCart = (email) => API.post("/cart", email);
export const postCart = (email, item) =>
  API.post("/cart/items", { email, item });
export const signin = (formData) => API.post("/user/signin", formData); // we are using a POST request for the signin as we are sending data  to the database
export const signup = (formData) => API.post("/user/signup", formData);
