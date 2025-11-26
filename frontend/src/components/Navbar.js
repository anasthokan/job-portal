import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">Job Portal</Link>

        <ul className="navbar-nav me-auto">

          {token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/jobs">Jobs</Link>
              </li>

              {role === "jobseeker" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/my-applications">My Applications</Link>
                </li>
              )}

              {role === "employer" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/post-job">Post Job</Link>
                </li>
              )}

              {role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            </>
          )}
        </ul>

        {token ? (
          <button className="btn btn-outline-light" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
