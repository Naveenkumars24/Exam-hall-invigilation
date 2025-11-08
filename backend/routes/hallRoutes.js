import express from "express";
import { getHalls, getHallById , createHall} from "../controllers/hallController.js";
const router = express.Router();

router.get("/", getHalls);
router.get("/:id", getHallById);
router.post("/add", createHall);

export default router;
