import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="container mt-4 text-center">
      <h3>Welcome to Job Portal 👋</h3>

      <p className="text-muted">Choose an action</p>

      {role === "jobseeker" && (
        <>
          <button className="btn btn-primary m-2" onClick={() => navigate("/jobs")}>
            Find Jobs
          </button>
          <button className="btn btn-secondary m-2" onClick={() => navigate("/my-applications")}>
            My Applications
          </button>
        </>
      )}

      {role === "employer" && (
        <>
          <button className="btn btn-primary m-2" onClick={() => navigate("/jobs")}>
            View Jobs
          </button>
          <button className="btn btn-success m-2" onClick={() => navigate("/post-job")}>
            Post a Job
          </button>
        </>
      )}

      {role === "admin" && (
        <>
          <button className="btn btn-dark m-2" onClick={() => navigate("/admin")}>
            Admin Dashboard
          </button>
        </>
      )}
    </div>
  );
}
