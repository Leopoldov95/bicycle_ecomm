import axios from "axios";

// so by using this url, we can use the backend logic
const userURL = `http://localhost:5000/user`;
const cartURL = `http://localhost:5000/cart`;

// will use the http methods here
export const fetchUser = () => axios.get(userURL);
export const postUser = (user) => axios.post(userURL, user);
export const fetchCart = () => axios.get(cartURL);
export const postCart = (item) => axios.post(cartURL, item);

/* export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${url}/${id}`) */
