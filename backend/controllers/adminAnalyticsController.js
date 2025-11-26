import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import bcrypt from "bcryptjs";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.json({
      totalUsers,
      totalJobs,
      totalApplications
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json({ message: "User created successfully", user: newUser });

  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
