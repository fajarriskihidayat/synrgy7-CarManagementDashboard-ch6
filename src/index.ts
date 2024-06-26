import express from "express";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

const rootRoute = require("./routes");

type CorsOriginCallback = (
  origin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void
) => void;
app.use(
  cors({
    credentials: true,
    origin: ((origin, callback) => {
      callback(null, true);
    }) as CorsOriginCallback,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rootRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
