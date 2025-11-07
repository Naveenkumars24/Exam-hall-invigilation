import express from "express";
import { getStudentsByHall, updateStudentStatus ,toggleStudentField} from "../controllers/studentController.js";
const router = express.Router();

router.get("/hall/:hallId", getStudentsByHall);
router.post("/:id", updateStudentStatus);
router.put("/update/:id", toggleStudentField);
router.post("/update/:id", toggleStudentField);

export default router;