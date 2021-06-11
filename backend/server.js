import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
// body-parser is now included in express
app.use(express.json());

app.use("/", home);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
