import express from "express";
import { getStudentsByHall, updateStudentStatus ,toggleStudentField, updateStudent , addStudent} from "../controllers/studentController.js";
const router = express.Router();

router.get("/hall/:hallId", getStudentsByHall);
router.post("/add", addStudent);
router.post("/:id", updateStudentStatus);

router.put("/update/:id", updateStudent);
router.post("/update/:id", toggleStudentField);

export default router;