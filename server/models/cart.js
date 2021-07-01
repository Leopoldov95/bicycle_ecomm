import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: String,
  quantity: Number,
  id: String
});

const PostCart = mongoose.model("postCart", postSchema);

export default PostCart;
