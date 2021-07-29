// all handlers for our routes
// A single file can have multiple export(s)

// bcrupt used to hash the password
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // store the user in the browser for a certain perios of time, allows the user to stay logged in for that determined period of time
import User from "../models/users.js";

// handle user req here
export const signin = async (req, res) => {
  // need two things from the fronted - email and password
  const { email, password } = req.body;

  try {
    // check to see if user exists
    const existingUser = await User.findOne({ email }); // look for an existing user by using the email

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });
    // if user does exist by passing the above checks, then the user can proceed to logging in
    // send a json web token to the frontend
    // the 'test' string here is the secret key for the token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test123",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const regex = new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{5,}'); // One Uppercase, One special Character, One Number, 5 char's minumum

  try {
    const existingUser = await User.findOne({ email }); // look for an existing user by using the email

    // for signup, checks to see if a user already exists
    if (existingUser)
      return res.status(404).json({ message: "User already exists" });
    
    if (!regex.test(password)) {
      return res.status(404).json({ message: "Password requirement not met" });
    }

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match" });

    // if above two checks are good, we can proceed to creating a user

    const hashedPassword = await bcrypt.hash(password, 12); // hashes the password, second argument (12) is the Salt

    const result = await User.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test123", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
