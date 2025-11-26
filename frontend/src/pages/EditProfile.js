import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [p, setP] = useState({
    headline: "",
    skills: "",
    experience: []
  });
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await API.get("/users/me");

    setP({
      headline: data.headline || "",
      skills: data.skills?.join(",") || "",
      experience:
        data.experience?.length > 0
          ? data.experience
          : [
              {
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: ""
              }
            ]
    });
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();

    const payload = {
      headline: p.headline,
      skills: p.skills.split(",").map((s) => s.trim()),
      experience: p.experience
    };

    await API.put("/users/me", payload);

    alert("Profile updated!");
    navigate("/profile");
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>Edit Profile</h3>

      <form className="card p-3 shadow-sm mt-3" onSubmit={save}>
        <label>Headline</label>
        <input
          className="form-control"
          value={p.headline}
          onChange={(e) => setP({ ...p, headline: e.target.value })}
        />

        <label className="mt-2">Skills (comma separated)</label>
        <input
          className="form-control"
          value={p.skills}
          onChange={(e) => setP({ ...p, skills: e.target.value })}
        />

        <h5 className="mt-3">Experience</h5>

        {p.experience.map((ex, idx) => (
          <div className="border p-2 mb-3 rounded" key={idx}>
            <label>Company</label>
            <input
              className="form-control"
              value={ex.company}
              onChange={(e) => {
                const list = [...p.experience];
                list[idx].company = e.target.value;
                setP({ ...p, experience: list });
              }}
            />

            <label>Role</label>
            <input
              className="form-control"
              value={ex.role}
              onChange={(e) => {
                const list = [...p.experience];
                list[idx].role = e.target.value;
                setP({ ...p, experience: list });
              }}
            />

            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              value={ex.startDate?.slice(0, 10)}
              onChange={(e) => {
                const list = [...p.experience];
                list[idx].startDate = e.target.value;
                setP({ ...p, experience: list });
              }}
            />

            <label>End Date</label>
            <input
              type="date"
              className="form-control"
              value={ex.endDate?.slice(0, 10)}
              onChange={(e) => {
                const list = [...p.experience];
                list[idx].endDate = e.target.value;
                setP({ ...p, experience: list });
              }}
            />

            <label>Description</label>
            <textarea
              className="form-control"
              rows="2"
              value={ex.description}
              onChange={(e) => {
                const list = [...p.experience];
                list[idx].description = e.target.value;
                setP({ ...p, experience: list });
              }}
            ></textarea>
          </div>
        ))}

        <button className="btn btn-success mt-3 w-100">Save Changes</button>
      </form>
    </div>
  );
}
