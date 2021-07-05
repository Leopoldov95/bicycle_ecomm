import express from "express";
import mongoose from "mongoose"; // Data Base
import cors from "cors"; // for Cross-Origin
import dotenv from 'dotenv'
import userRoutes from "./routes/user.js"; // when using import, MUST include the .js file extension
import cartRoutes from "./routes/cart.js";

const app = express();
dotenv.config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" })); // To parse the incoming requests with JSON payloads

app.use(cors());

app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
// mongodb cloud atlas - credentials must be safely stored before production
// make sure to specificly connect to bicycle shop page

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
