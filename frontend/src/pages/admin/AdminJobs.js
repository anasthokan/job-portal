import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await API.get("/admin/jobs");
    setJobs(data);
  };

  const remove = async (id) => {
    if (window.confirm("Delete job?")) {
      await API.delete(`/admin/jobs/${id}`);
      load();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") navigate("/jobs");
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h3>All Jobs</h3>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Employer Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.employer?.email}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => remove(job._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
