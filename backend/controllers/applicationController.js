import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const application = await Application.create({
      job: jobId,
      applicant: userId
    });

    res.status(201).json({ message: "Applied successfully", application });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already applied to this job" });
    }
    res.status(500).json({ message: "Server error", err });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ applicant: userId })
      .populate("job", "title company location jobType")
      .sort({ appliedAt: -1 });

    res.json({
      total: applications.length,
      applications
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export const getApplicantsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const employerId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.employer.toString() !== employerId) {
      return res.status(403).json({ message: "Not authorized to view applicants" });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .sort({ appliedAt: -1 });

    res.json({
      total: applications.length,
      applications
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.applicationId;

    const allowed = ["applied", "reviewing", "shortlisted", "rejected"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.json({
      message: "Status updated successfully",
      application
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

export const checkStatus = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    const application = await Application.findOne({
      job: jobId,
      applicant: userId
    });

    if (!application) {
      return res.json({ applied: false });
    }

    res.json({
      applied: true,
      status: application.status
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
