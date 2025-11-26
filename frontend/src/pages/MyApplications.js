import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  const load = async () => {
    const { data } = await API.get("/applications/my");
    setApplications(data.applications);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Applications</h3>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Applied At</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.job.title}</td>
              <td>{app.job.company}</td>
              <td>
                <span className="badge bg-info">{app.status}</span>
              </td>
              <td>{new Date(app.appliedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {applications.length === 0 && (
        <p>No applications found.</p>
      )}
    </div>
  );
}
