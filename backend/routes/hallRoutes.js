import express from "express";
import { getHalls, getHallById } from "../controllers/hallController.js";
const router = express.Router();

router.get("/", getHalls);
router.get("/:id", getHallById);

export default router;
