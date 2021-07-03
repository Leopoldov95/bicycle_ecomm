import axios from "axios";

// so by using this url, we can use the backend logic
const userURL = `http://localhost:5000/user`;

// will use the http methods here
export const fetchUsers = () => axios.get(userURL);
export const postUser = (user) => axios.post(userURL, user);
console.log(fetchUsers);
/* export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${url}/${id}`) */
