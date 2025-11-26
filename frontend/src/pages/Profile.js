import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await API.get("/users/me");
    setUser(data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!user) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>My Profile</h3>

      <div className="card p-3 shadow-sm mt-3">
        <h4>{user.name}</h4>
        <p className="text-muted">{user.email}</p>

        {user.headline && <p><b>Headline:</b> {user.headline}</p>}

        <div>
          <b>Skills:</b><br />
          {user.skills?.map((s, i) => (
            <span key={i} className="badge bg-primary me-2">{s}</span>
          ))}
        </div>

        {user.experience?.length > 0 && (
          <div className="mt-3">
            <b>Experience:</b>
            {user.experience.map((e) => (
              <div key={e._id} className="border p-2 mt-2 rounded">
                <b>{e.role}</b> @ {e.company}
                <br />
                <span className="text-muted">
                  {new Date(e.startDate).toLocaleDateString()} - 
                  {e.endDate ? new Date(e.endDate).toLocaleDateString() : "Present"}
                </span>
                <p>{e.description}</p>
              </div>
            ))}
          </div>
        )}

        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
