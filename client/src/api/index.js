import axios from "axios";

// so by using this url, we can use the backend logic
const API = axios.create({
  baseURL: "http://localhost:5000",
});
/* const userURL = `http://localhost:5000/user`;
const cartURL = `http://localhost:5000/cart`;
 */
// will use the http methods here

export const fetchCart = () => API.get("/cart");
export const postCart = (item) => API.post("/cart", item);
export const signin = (formData) => API.post("/user/signin", formData); // we are using a POST request for the signin as we are sending data  to the database
export const signup = (formData) => API.post("/user/signup", formData);
