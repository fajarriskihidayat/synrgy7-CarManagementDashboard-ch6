import { Router } from "express";
import {
  createAdmin,
  getUser,
  googleAuth,
  login,
  loginSuperAdmin,
  logout,
  refreshToken,
  register,
} from "../controllers/usersController";

const auth = require("../middleware/auth");
const isSuperAdmin = require("../middleware/isSuperAdmin");

const router = Router();

router.get("/profile", auth, getUser);
router.get("/token", refreshToken);
router.post("/register", register);
router.post("/admin/register", isSuperAdmin, createAdmin);
router.post("/login", login);
router.post("/googleAuth", googleAuth);
router.post("/superadmin/login", loginSuperAdmin);
router.delete("/logout", logout);

module.exports = router;
