import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// HOST ANALYTICS
export const getHostAnalytics = async (req, res) => {
  const userId = req.user.id || req.user._id; // support either property

  // TODO: Replace with real DB queries
  const stats = {
    totalListings: 2,
    totalBookings: 12,
    earnings: 400,
    views: 200,
    favoriteCount: 5,
  };

  // You probably want to fetch stats filtered by userId!
  res.json(stats);
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { email, password, name, username, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      username,
      role,
    });
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: "Registration failed", error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1d" }
  );
  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      role: user.role,
    },
  });
};

// GET PROFILE
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id || req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
  });
};