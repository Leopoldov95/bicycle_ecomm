import express from "express";
import mongoose from "mongoose"; // Data Base
import cors from "cors"; // for Cross-Origin
import API_ROUTES from "./routes/index.js"; // when using import, MUST include the .js file extension

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" })); // To parse the incoming requests with JSON payloads

app.use(cors());

app.use("/user", API_ROUTES);
// mongodb cloud atlas - credentials must be safely stored before production
// make sure to specificly connect to bicycle shop page
const CONNECTION_URL =
  "mongodb+srv://cycle_admin:Admin@Leov95@cluster0.n9jii.mongodb.net/bicycle_shop?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
