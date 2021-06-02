const express = require("express");
const router = express.Router();
const viewCart = require("../views/cart");
const {
  addProduct,
  getAllItems,
  getSingleItem,
  updateItem,
} = require("../controllers/main");

router.post("/cart/products", async (req, res) => {
  try {
    let cart; // create empty cart variable

    if (!req.session.cartId) {
      // we dont have a cart, we need to create one
      // and store the cart id on the req.session.cartId property
      cart = await addProduct({ items: [] }, "cart.json");

      req.session.cartId = cart.id;
    } else {
      // we have a cart, lets get it from the repository
      cart = await getSingleItem(req.session.cartId, "cart.json");
    }

    const existingItem = cart.items.find(
      (item) => item.id === req.body.productId
    );

    if (existingItem) {
      // either increment quantity for existing product
      existingItem.quantity++;
    } else {
      // OR add new item to existing array
      cart.items.push({ id: req.body.productId, quantity: 1 });
    }
    await updateItem(cart.id, { items: cart.items }, "cart.json");

    return res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
});

router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await getSingleItem(req.session.cartId, "cart.json");

  for (let item of cart.items) {
    const product = await getSingleItem(item.id);

    item.product = product;
  }

  res.send(viewCart({ items: cart.items }));
});

router.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await getSingleItem(req.session.cartId, "cart.json");

  const items = cart.items.filter((item) => item.id !== itemId);

  await updateItem(req.session.cartId, { items }, "cart.json");

  res.redirect("/cart");
});
module.exports = router;
