// all handlers for our routes
// A single file can have multiple export(s)
import mongoose from "mongoose";
import PostUser from "../models/users.js";
import PostCart from "../models/cart.js";

export const getUser = async (req, res) => {
    try {
      // retieve all posts we have in the data base
      const postUsers = await PostUser.find();
      //console.log(postMessages);
      res.status(200).json(postUsers);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };