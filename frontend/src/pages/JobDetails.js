import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [appliedStatus, setAppliedStatus] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const loadJob = async () => {
    const { data } = await API.get(`/jobs/${id}`);
    setJob(data);
  };

  const checkStatus = async () => {
    const { data } = await API.get(`/applications/check/${id}`);
    setAppliedStatus(data);
  };

  const apply = async () => {
    await API.post(`/applications/${id}/apply`);
    alert("Applied Successfully!");
    checkStatus();
  };

  useEffect(() => {
    loadJob();
    if (role === "jobseeker") checkStatus();
  }, []);

  if (!job) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>{job.title}</h3>
      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Type:</b> {job.jobType}</p>
      <p><b>Description:</b> {job.description}</p>

      {role === "jobseeker" && (
        <div className="mt-3">
          {appliedStatus?.applied ? (
            <>
              <button className="btn btn-secondary" disabled>
                Already Applied
              </button>
              <p className="mt-2">
                Status: <span className="badge bg-info">{appliedStatus.status}</span>
              </p>
            </>
          ) : (
            <button className="btn btn-success" onClick={apply}>
              Apply Job
            </button>
          )}
        </div>
      )}
    </div>
  );
}
