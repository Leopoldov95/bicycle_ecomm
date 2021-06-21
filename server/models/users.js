import mongoose from "mongoose";
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: String,
  password: String,
});

const PostUser = mongoose.model("postUser", postSchema);

export default PostUser;
