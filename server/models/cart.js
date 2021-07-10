import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  email: String,
  items: [
    {
      title: String,
      quantity: Number,
      id: Number,
      price: Number,
      bikeSize: String,
      image: String,
    },
  ],
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
