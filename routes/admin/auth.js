const express = require("express");
const router = express.Router();
const { handleErrors } = require("../../controllers/middlewares");
const viewLogin = require("../../views/admin/auth/login");
const viewSignup = require("../../views/admin/auth/signup");
const { createUser, getSingleUser } = require("../../controllers/users");
//const { comparePassword } = require("./validators");
//testing
//const { body, validationResult } = require("express-validator"); => don't need this as validation middleware is handling the express validation
const {
  checkEmailExists,
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser,
} = require("./validation");
router.post(
  "/login",
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(viewLogin),
  async (req, res) => {
    /*  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    } => so this error function is being handled by the helper error function */

    const user = await getSingleUser(req.body.email);
    req.session.userId = user.id;
    //console.log(req.body);
    return res.redirect("/admin/products");
  }
);
router.get("/login", (req, res) => {
  if (req.session.userId) {
    res.redirect("/admin/products");
  }
  res.send(viewLogin({})); //need to pass an empty object to satisfy the { errors } argument
});
router.get("/signup", (req, res) => {
  res.send(viewSignup({}));
});

router.post(
  "/signup",
  [
    requireEmail,
    checkEmailExists,
    requirePassword,
    requirePasswordConfirmation,
  ],
  handleErrors(viewSignup),

  async (req, res) => {
    // post the req.body to users.json
    //console.log(req.body);
    const user = await createUser(req.body);

    req.session.userId = user.id;
    //req.session.userId = "test123";
    // for some unkown reason, this only works when online, redirect failed during offline testing...
    return res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null; // will take the current sessoin and forget it
  res.redirect("/login");
});
module.exports = router;
