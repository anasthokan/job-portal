import User from "../models/User.js";
import Job from "../models/Job.js";
import bcrypt from "bcryptjs";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("employer", "email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// Create user (Admin only)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPass, role });

    res.status(201).json({ message: "User created successfully", user });

  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !["admin", "employer", "jobseeker"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Role updated successfully", user });

  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
