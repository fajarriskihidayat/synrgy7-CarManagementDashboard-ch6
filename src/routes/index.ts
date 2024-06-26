import { Router } from "express";

const router = Router();

const isAdminOrSuperAdmin = require("../middleware/isAdminOrSuperAdmin");

const carsRoute = require("./carsRoute");
const carSizeRoute = require("./carSizeRoute");
const usersRoute = require("./usersRoute");

router.get("/", (req, res) => {
  res.send("Welcome to api documentation car management dashboard");
});
router.use("/api/cars", carsRoute);
router.use("/api/sizes", isAdminOrSuperAdmin, carSizeRoute);
router.use("/api/users", usersRoute);

module.exports = router;
