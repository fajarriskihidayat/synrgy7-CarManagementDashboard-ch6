"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
const rootRoute = require("./routes");
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
}));
app.use(cookieParser());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(rootRoute);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
