import { NextFunction, Request, Response } from "express";
import UsersService from "../services/userServise";

const jwt = require("jsonwebtoken");

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split("Bearer ")[1];
    const tokenPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    (req as any).user = await new UsersService().getByEmail(tokenPayload.email);

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
