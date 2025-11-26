import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, description, skillsRequired } = req.body;

    if (!title || !company || !location || !jobType || !description || !skillsRequired) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newJob = await Job.create({
      employer: req.user.id,
      title,
      company,
      location,
      jobType,
      description,
      skillsRequired
    });

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};


export const getJobs = async (req, res) => {
  try {
    const { search, location, jobType, skills } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (skills) {
      query.skillsRequired = { $in: skills.split(",") };
    }

    const jobs = await Job.find(query)
      .populate("employer", "name email")
      .sort({ createdAt: -1 });

    res.json({ total: jobs.length, jobs });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};


export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
