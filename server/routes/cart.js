import express from "express";
import { postCart, getCart } from "../controllers/cart.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// will need to setup middleware here
router.post("/", getCart);
router.post("/items", auth, postCart);

export default router;
