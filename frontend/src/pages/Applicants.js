import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  const load = async () => {
    const { data } = await API.get(`/applications/job/${jobId}`);
    setApps(data.applications);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/applications/status/${id}`, { status });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Applicants</h3>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Applicant</th>
            <th>Email</th>
            <th>Status</th>
            <th>Change</th>
          </tr>
        </thead>

        <tbody>
          {apps.map((app) => (
            <tr key={app._id}>
              <td>{app.applicant.name}</td>
              <td>{app.applicant.email}</td>
              <td>
                <span className="badge bg-info">{app.status}</span>
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(app._id, "shortlisted")}
                >
                  Shortlist
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => updateStatus(app._id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {apps.length === 0 && <p>No applicants yet.</p>}
    </div>
  );
}
