import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  const load = async () => {
    try {
      const { data } = await API.get(`/applications/job/${jobId}`);
      setApps(data.applications);
    } catch (err) {
      console.log("Error loading applicants", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/applications/${id}`, { status });
      load();
    } catch (err) {
      alert("Error updating status");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Applicants for this Job</h3>
      <p className="text-muted">{apps.length} applications received.</p>

      <table className="table table-bordered mt-3 shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Status</th>
            <th>Update Status</th>
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
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => updateStatus(app._id, "reviewing")}
                >
                  Reviewing
                </button>

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

      {apps.length === 0 && (
        <p className="text-center text-muted mt-4">No applicants yet.</p>
      )}
    </div>
  );
}
