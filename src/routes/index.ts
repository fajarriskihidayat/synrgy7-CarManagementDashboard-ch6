import { Request, Response, Router } from "express";

const router = Router();

const isAdminOrSuperAdmin = require("../middleware/isAdminOrSuperAdmin");

const carsRoute = require("./carsRoute");
const carSizeRoute = require("./carSizeRoute");
const usersRoute = require("./usersRoute");

router.use("/api/cars", carsRoute);
router.use("/api/sizes", isAdminOrSuperAdmin, carSizeRoute);
router.use("/api/users", usersRoute);

module.exports = router;
