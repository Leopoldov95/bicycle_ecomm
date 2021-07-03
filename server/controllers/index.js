// all handlers for our routes
// A single file can have multiple export(s)
import mongoose from "mongoose";
import User from "../models/users.js";
import PostCart from "../models/cart.js";

export const getUser = async (req, res) => {
  try {
    // retieve all posts we have in the data base
    const Users = await User.find();
    //console.log(postMessages);
    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postUser = async (req, res) => {
  try {
    const email = req.body.title;
    const password = req.body.password;
    const newUser = new User({
      email,
      password,
    });
    newUser.save();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
