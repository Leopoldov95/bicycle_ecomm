import express from "express";
import { postCart, getCart } from "../controllers/index.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// will need to setup middleware here
router.get("/", getCart);
router.post("/", postCart);

export default router;
