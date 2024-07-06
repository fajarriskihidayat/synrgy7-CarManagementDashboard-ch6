"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jwt = require("jsonwebtoken");
const createToken = (payload, SECRET, exp) => {
    return jwt.sign({ id: payload.id, email: payload.email, role: payload.role }, SECRET, {
        expiresIn: exp,
    });
};
exports.createToken = createToken;
