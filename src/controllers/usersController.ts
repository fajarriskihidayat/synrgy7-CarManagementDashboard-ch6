import { Request, Response } from "express";
import UsersService from "../services/userServise";
import { checkPassword } from "../utils/checkPassword";
import { createToken } from "../utils/createToken";

const jwt = require("jsonwebtoken");
const encryptPassword = require("../utils/encryptPassword");

export const register = async (req: Request, res: Response) => {
  const payload = req.body;

  if (!payload.name || !payload.email || !payload.password) {
    return res.status(400).json({ message: "Data not null" });
  }

  const user = await new UsersService().getByEmail(payload);
  if (user) return res.status(404).json({ message: "Email already is exist" });

  const encryptedPass = await encryptPassword(payload.password);

  try {
    const body = {
      ...payload,
      password: encryptedPass,
      role: "member",
    };
    const addUser = await new UsersService().register(body);

    return res.status(200).json({
      message: "Register success",
      data: addUser,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const payload = req.body;

  if (!payload.email || !payload.password) {
    return res.status(400).json({ message: "Email and Password is not null" });
  }

  const user = await new UsersService().getByEmail(payload);
  if (!user) return res.status(404).json({ message: "Email is not exist" });

  const checkedPwd = await checkPassword(payload.password, user.password);
  if (!checkedPwd) {
    return res.status(400).json({ message: "Password is wrong" });
  }

  const accessToken = createToken(user, process.env.ACCESS_TOKEN_SECRET, "15s");
  const refreshToken = createToken(
    user,
    process.env.REFRESH_TOKEN_SECRET,
    "1d"
  );

  await new UsersService().updateToken(user.id, refreshToken);
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
};

export const loginSuperAdmin = async (req: Request, res: Response) => {
  const payload = req.body;

  if (!payload.email || !payload.password) {
    return res.status(400).json({ message: "Email and Password is not null" });
  }

  const user = await new UsersService().getByEmail(payload);
  if (user?.role !== "superadmin") {
    return res.status(403).json({ message: "Permission denied" });
  }

  if (!user) return res.status(404).json({ message: "Email is not exist" });

  const checkedPwd = await checkPassword(payload.password, user.password);
  if (!checkedPwd) {
    return res.status(400).json({ message: "Password is wrong" });
  }

  const accessToken = createToken(user, process.env.ACCESS_TOKEN_SECRET, "15s");
  const refreshToken = createToken(
    user,
    process.env.REFRESH_TOKEN_SECRET,
    "1d"
  );

  await new UsersService().updateToken(user.id, refreshToken);
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
};

export const createAdmin = async (req: Request, res: Response) => {
  const payload = req.body;

  if (!payload.name || !payload.email || !payload.password) {
    return res.status(400).json({ message: "Data not null" });
  }

  const user = await new UsersService().getByEmail(payload);
  if (user) return res.status(404).json({ message: "Email already is exist" });

  const encryptedPass = await encryptPassword(payload.password);

  try {
    const body = {
      ...payload,
      password: encryptedPass,
      role: "admin",
    };
    const addAdmin = await new UsersService().register(body);

    return res.status(200).json({
      message: "Register success",
      data: addAdmin,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Get user success",
    data: (req as any).user,
  });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await new UsersService().getUsers(refreshToken);
  if (!user[0]) return res.sendStatus(403);
  await new UsersService().updateToken(user[0].id, null);
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await new UsersService().getUsers(refreshToken);
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err: ErrorCallback) => {
        if (!!err) return res.sendStatus(403);
        const accessToken = createToken(
          user[0],
          process.env.ACCESS_TOKEN_SECRET,
          "15s"
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
