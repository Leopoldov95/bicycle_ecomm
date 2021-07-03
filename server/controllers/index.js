// all handlers for our routes
// A single file can have multiple export(s)
import mongoose from "mongoose";
import User from "../models/users.js";
import { v4 as uuidv4 } from "uuid";
import Cart from "../models/cart.js";

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
    const { email, password, passwordConfirmation } = req.body;
    const id = uuidv4();
    if (password === passwordConfirmation) {
      const newUser = new User({
        email,
        password,
        id,
      });
      newUser.save();
    } else {
      throw Error("Passwords must match!!");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    // will want to pass individual item here later
    Cart.find().then((item) => res.json(item));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postCart = async (req, res) => {
  try {
    const { title, price, id, bikeSize, image } = req.body;
    const newCart = new Cart({
      title,
      image,
      price,
      id,
      bikeSize,
    });
    newCart.save();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
