import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  id: String,
});

const User = mongoose.model("user", userSchema);

export default User;
