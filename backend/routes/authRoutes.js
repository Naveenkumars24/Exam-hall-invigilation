import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register → Create new user
router.post("/register", registerUser);

// POST /api/auth/login → Login existing user
router.post("/login", loginUser);

export default router;
