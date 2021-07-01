import express from "express";
import { getUser } from "../controllers/index.js";
const router = express.Router();

router.get("/", getUser)

export default router;