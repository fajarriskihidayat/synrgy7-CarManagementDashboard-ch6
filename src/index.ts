import express from "express";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

const rootRoute = require("./routes");

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rootRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
