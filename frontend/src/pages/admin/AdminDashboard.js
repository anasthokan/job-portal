import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <hr />

      <button
        className="btn btn-primary m-2"
        onClick={() => navigate("/admin/users")}
      >
        Manage Users
      </button>

      <button
        className="btn btn-success m-2"
        onClick={() => navigate("/admin/jobs")}
      >
        Manage Jobs
      </button>
    </div>
  );
}
