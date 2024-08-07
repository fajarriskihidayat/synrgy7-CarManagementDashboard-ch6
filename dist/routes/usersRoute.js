"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const auth = require("../middleware/auth");
const isSuperAdmin = require("../middleware/isSuperAdmin");
const router = (0, express_1.Router)();
router.get("/profile", auth, usersController_1.getUser);
router.get("/token", usersController_1.refreshToken);
router.post("/register", usersController_1.register);
router.post("/admin/register", isSuperAdmin, usersController_1.createAdmin);
router.post("/login", usersController_1.login);
router.post("/googleAuth", usersController_1.googleAuth);
router.post("/superadmin/login", usersController_1.loginSuperAdmin);
router.delete("/logout", usersController_1.logout);
module.exports = router;
