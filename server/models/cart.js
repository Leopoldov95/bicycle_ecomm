import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  title: String,
  quantity: Number,
  price: Number,
  id: String,
  bikeSize: String,
  image: String,
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
