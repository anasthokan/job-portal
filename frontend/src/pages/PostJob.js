import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("full-time");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      company,
      location,
      jobType,
      description,
      skillsRequired: skills.split(",").map((s) => s.trim())
    };

    await API.post("/jobs", payload);
    alert("Job posted successfully!");
    navigate("/jobs");
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>Post a Job</h3>

      <form onSubmit={submit} className="card p-3 shadow-sm mt-3">

        <label>Job Title</label>
        <input className="form-control"
               value={title}
               onChange={(e) => setTitle(e.target.value)} />

        <label className="mt-2">Company</label>
        <input className="form-control"
               value={company}
               onChange={(e) => setCompany(e.target.value)} />

        <label className="mt-2">Location</label>
        <input className="form-control"
               value={location}
               onChange={(e) => setLocation(e.target.value)} />

        <label className="mt-2">Job Type</label>
        <select className="form-control"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="remote">Remote</option>
          <option value="internship">Internship</option>
        </select>

        <label className="mt-2">Description</label>
        <textarea className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />

        <label className="mt-2">Skills (comma separated)</label>
        <input className="form-control"
               value={skills}
               onChange={(e) => setSkills(e.target.value)} />

        <button className="btn btn-primary mt-3 w-100">Post Job</button>
      </form>
    </div>
  );
}
