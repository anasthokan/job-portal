import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, enum: ["full-time", "part-time", "internship", "remote"], required: true },
  description: { type: String, required: true },
  skillsRequired: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Job", jobSchema);
