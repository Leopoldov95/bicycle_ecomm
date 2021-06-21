import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: String,
  quantity: Number,
});

const PostUser = mongoose.model("postUser", postSchema);

export default PostUser;
