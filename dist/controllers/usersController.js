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
exports.refreshToken = exports.logout = exports.getUser = exports.createAdmin = exports.loginSuperAdmin = exports.login = exports.register = void 0;
const userServise_1 = __importDefault(require("../services/userServise"));
const checkPassword_1 = require("../utils/checkPassword");
const createToken_1 = require("../utils/createToken");
const jwt = require("jsonwebtoken");
const encryptPassword = require("../utils/encryptPassword");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (!payload.name || !payload.email || !payload.password) {
        return res.status(400).json({ message: "Data not null" });
    }
    const user = yield new userServise_1.default().getByEmail(payload);
    if (user)
        return res.status(404).json({ message: "Email already is exist" });
    const encryptedPass = yield encryptPassword(payload.password);
    try {
        const body = Object.assign(Object.assign({}, payload), { password: encryptedPass, role: "member" });
        const addUser = yield new userServise_1.default().register(body);
        return res.status(200).json({
            message: "Register success",
            data: addUser,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (!payload.email || !payload.password) {
        return res.status(400).json({ message: "Email and Password is not null" });
    }
    const user = yield new userServise_1.default().getByEmail(payload);
    if (!user)
        return res.status(404).json({ message: "Email is not exist" });
    const checkedPwd = yield (0, checkPassword_1.checkPassword)(payload.password, user.password);
    if (!checkedPwd) {
        return res.status(400).json({ message: "Password is wrong" });
    }
    const accessToken = (0, createToken_1.createToken)(user, process.env.ACCESS_TOKEN_SECRET, "15s");
    const refreshToken = (0, createToken_1.createToken)(user, process.env.REFRESH_TOKEN_SECRET, "1d");
    yield new userServise_1.default().updateToken(user.id, refreshToken);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: "/",
        sameSite: "none",
    });
    return res.status(200).json({
        message: "Login success",
        accessToken,
    });
});
exports.login = login;
const loginSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (!payload.email || !payload.password) {
        return res.status(400).json({ message: "Email and Password is not null" });
    }
    const user = yield new userServise_1.default().getByEmail(payload);
    if ((user === null || user === void 0 ? void 0 : user.role) !== "superadmin") {
        return res.status(403).json({ message: "Permission denied" });
    }
    if (!user)
        return res.status(404).json({ message: "Email is not exist" });
    const checkedPwd = yield (0, checkPassword_1.checkPassword)(payload.password, user.password);
    if (!checkedPwd) {
        return res.status(400).json({ message: "Password is wrong" });
    }
    const accessToken = (0, createToken_1.createToken)(user, process.env.ACCESS_TOKEN_SECRET, "15s");
    const refreshToken = (0, createToken_1.createToken)(user, process.env.REFRESH_TOKEN_SECRET, "1d");
    yield new userServise_1.default().updateToken(user.id, refreshToken);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: "/",
        sameSite: "none",
    });
    return res.status(200).json({
        message: "Login success",
        accessToken,
    });
});
exports.loginSuperAdmin = loginSuperAdmin;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (!payload.name || !payload.email || !payload.password) {
        return res.status(400).json({ message: "Data not null" });
    }
    const user = yield new userServise_1.default().getByEmail(payload);
    if (user)
        return res.status(404).json({ message: "Email already is exist" });
    const encryptedPass = yield encryptPassword(payload.password);
    try {
        const body = Object.assign(Object.assign({}, payload), { password: encryptedPass, role: "admin" });
        const addAdmin = yield new userServise_1.default().register(body);
        return res.status(200).json({
            message: "Register success",
            data: addAdmin,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createAdmin = createAdmin;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "Get user success",
        data: req.user,
    });
});
exports.getUser = getUser;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    const user = yield new userServise_1.default().getUsers(refreshToken);
    if (!user[0])
        return res.sendStatus(403);
    yield new userServise_1.default().updateToken(user[0].id, null);
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
});
exports.logout = logout;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.sendStatus(401);
        const user = yield new userServise_1.default().getUsers(refreshToken);
        if (!user[0])
            return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
            if (!!err)
                return res.sendStatus(403);
            const accessToken = (0, createToken_1.createToken)(user[0], process.env.ACCESS_TOKEN_SECRET, "15s");
            res.json({ accessToken });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.refreshToken = refreshToken;
