
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: String,
  password: String,
  id: String,
});

const PostUser = mongoose.model("postUser", postSchema);

export default PostUser;
