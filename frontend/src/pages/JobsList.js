import { useEffect, useState } from "react";
import API from "../services/api";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const loadJobs = async () => {
    const query = [];
    if (search) query.push(`search=${search}`);
    if (location) query.push(`location=${location}`);
    if (jobType) query.push(`jobType=${jobType}`);

    const q = query.length ? `?${query.join("&")}` : "";

    const { data } = await API.get(`/jobs${q}`);
    setJobs(data.jobs);
  };

  useEffect(() => {
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filter = (e) => {
    e.preventDefault();
    loadJobs();
  };

  return (
    <div className="container mt-4">
      <h3>Find Jobs</h3>

      <form className="row mt-3" onSubmit={filter}>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search job title / company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="remote">Remote</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100">Filter</button>
        </div>
      </form>

      <div className="row mt-4">
        {jobs.map((job) => (
          <div key={job._id} className="col-md-4 mt-3">
            <div className="card p-3 shadow-sm">
              <h5>{job.title}</h5>
              <p><b>Company:</b> {job.company}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Type:</b> {job.jobType}</p>
              <button
                className="btn btn-outline-primary"
                onClick={() => (window.location.href = `/job/${job._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && <p>No jobs found.</p>}
      </div>
    </div>
  );
}
