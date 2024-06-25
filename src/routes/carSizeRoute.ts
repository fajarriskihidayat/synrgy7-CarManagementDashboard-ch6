import { Router } from "express";
import {
  getSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
} from "../controllers/carSizeController";

const router = Router();

router.get("/", getSizes);
router.get("/:id", getSizeById);
router.post("/", createSize);
router.put("/:id", updateSize);
router.delete("/:id", deleteSize);

module.exports = router;
