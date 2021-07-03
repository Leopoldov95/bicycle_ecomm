import express from "express";
import { postCart, getCart } from "../controllers/index.js";
const router = express.Router();

router.get("/", getCart);
router.post("/", postCart);

export default router;
