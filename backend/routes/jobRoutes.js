import express from "express";
import { createJob, getJobs, getJobById } from "../controllers/jobController.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import Job from "../models/Job.js";

const router = express.Router();

// Public - Fetch all jobs
router.get("/", getJobs);

// Employer - Fetch their own jobs
router.get(
  "/my-jobs",
  authMiddleware,
  authorizeRoles("employer"),
  async (req, res) => {
    try {
      const jobs = await Job.find({ employer: req.user.id }).sort({ createdAt: -1 });
      res.json({ total: jobs.length, jobs });
    } catch (err) {
      res.status(500).json({ message: "Server error", err });
    }
  }
);

// Public - Job details (Place AFTER specific routes)
router.get("/:id", getJobById);

// Employer - Post Job
router.post("/", authMiddleware, authorizeRoles("employer"), createJob);

// Employer - Update Job
router.put("/:id", authMiddleware, authorizeRoles("employer"), async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Job updated successfully", job: updatedJob });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

export default router;
