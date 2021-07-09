import express from "express";
import {
  postCart,
  getCart,
  deleteItem,
  updateQuantity,
} from "../controllers/cart.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// will need to setup middleware here
router.post("/", getCart);
router.post("/items", auth, postCart);
router.patch("/items", auth, deleteItem);
router.patch("/items/item", auth, updateQuantity);

export default router;
