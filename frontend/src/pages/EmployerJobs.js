import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function EmployerJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const employerId = localStorage.getItem("userId");

  const loadJobs = async () => {
    try {
      const { data } = await API.get("/jobs");

      // If employer is populated
      const myJobs = data.jobs.filter(job => {
        if (typeof job.employer === "string") {
          // job.employer is ID string
          return job.employer === employerId;
        }
        if (job.employer && job.employer._id) {
          // job.employer is object
          return job.employer._id === employerId;
        }
        return false;
      });

      setJobs(myJobs);
    } catch (err) {
      console.log("Error loading jobs:", err);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Posted Jobs</h3>

      <div className="row mt-4">
        {jobs.map((job) => (
          <div key={job._id} className="col-md-4 mt-3">
            <div className="card p-3 shadow-sm">

              <h5>{job.title}</h5>
              <p><b>Company:</b> {job.company}</p>
              <p><b>Location:</b> {job.location}</p>

              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate(`/job/${job._id}`)}
              >
                View Job
              </button>

              <button
                className="btn btn-success mt-2 ms-2"
                onClick={() => navigate(`/applicants/${job._id}`)}
              >
                View Applicants
              </button>

            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <p className="text-muted mt-4">You have not posted any jobs yet.</p>
        )}
      </div>
    </div>
  );
}
