import mongoose from "mongoose";

const itemsSchema = mongoose.Schema({
  title: String,
  quantity: Number,
  price: Number,
  bikeSize: String,
  image: String,
});

const Items = mongoose.model("items", itemsSchema);

export default Items;
