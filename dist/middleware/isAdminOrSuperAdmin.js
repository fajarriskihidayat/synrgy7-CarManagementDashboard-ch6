"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userServise_1 = __importDefault(require("../services/userServise"));
const jwt = require("jsonwebtoken");
const isAdminOrSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split("Bearer ")[1];
        const tokenPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = yield new userServise_1.default().getByEmail(tokenPayload);
        if (req.user.role !== "admin" &&
            req.user.role !== "superadmin") {
            return res.status(401).json({ message: "Permission denied" });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
});
module.exports = isAdminOrSuperAdmin;
