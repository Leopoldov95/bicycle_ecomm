const express = require("express");
const cookieSession = require("cookie-session");
const app = express();

const env = process.env.PORT || 3000;
// static assets

app.use(express.static("public"));

// parse json data, lets us use json data
app.use(express.json());

// parse form data for PUT and POST requests
app.use(express.urlencoded({ extended: false }));
// setup routes here
// const helper = require("./routes/helper");
const products = require("./routes/products");
const auth = require("./routes/admin/auth");
const adminProducts = require("./routes/admin/products");
const cart = require("./routes/cart");
const unkown = require("./views/404");
// at some point will nee to setup multer and install POSTMAN

// cookie session - this is need in order to store and use sessions, such as keeping track if a user is logged in or not
app.use(
  cookieSession({
    keys: ["4bdk9b47c"], //this property is used to encrypt the cookie session
  })
);

// our routes

app.use(products);
app.use(cart);
app.use(auth);
app.use(adminProducts);
// handle unkown routes here
app.get("*", (req, res) => {
  res.status(404).send(unkown());
});

app.listen(env, () => {
  console.log("server is listening at port 3000...");
});
