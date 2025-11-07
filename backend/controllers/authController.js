import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ✅ REGISTER NEW USER
export const registerUser = async (req, res) => {
  try {
    const { username, password, name, role } = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create new user
    const user = await User.create({ username, password, name, role });

    res.status(201).json({
      message: "✅ User created successfully",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGIN EXISTING USER
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
