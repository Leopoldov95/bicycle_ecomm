const { check } = require("express-validator");
const { getSingleUser, comparePasswords } = require("../../controllers/users");

// Having the validation code here to prevent the auth.js file from bein too crowded.

module.exports = {
  requireTitle: check("title")
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage("Must be between 5 and 40 characters"), // the name that appears in check('title') corresponds to the name of the html input element
  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Must be a number greater than 1"), // setting the price input into a float number
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const existingUser = await getSingleUser({ email });
      // checking to see if email is in use
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),
  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passwordConfirmation, { req }) => {
      // check if passwords match
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Passwords must match");
      } else {
        return true;
      }
    }),
  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await getSingleUser(email);
      if (!user) {
        throw new Error("Email not found!");
      }
    }),
  checkEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email already exists")
    .custom(async (email) => {
      const user = await getSingleUser(email);
      if (user) {
        throw new Error("Email already exists");
      }
    }),

  requireValidPasswordForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const email = req.body.email;
      //console.log(req.body);
      const user = await getSingleUser(email);

      if (!user) {
        throw new Error("Invalid Password");
      }
      const validPassword = await comparePasswords(user.password, password); // returns a boolean value

      if (!validPassword) {
        throw new Error("Invalid Password");
      }
    }),
};
