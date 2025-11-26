import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", { name, email, password, role });
      alert("Registered! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration error");
    }
  };

  return (
    <div className="container mt-4 col-md-4">
      <h3>Register</h3>

      <form onSubmit={submit}>
        <label>Name</label>
        <input className="form-control"
               value={name}
               onChange={(e) => setName(e.target.value)} />

        <label className="mt-2">Email</label>
        <input className="form-control"
               value={email}
               onChange={(e) => setEmail(e.target.value)} />

        <label className="mt-2">Password</label>
        <input type="password"
               className="form-control"
               value={password}
               onChange={(e) => setPassword(e.target.value)} />

        <label className="mt-2">Role</label>
        <select className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button className="btn btn-primary mt-3 w-100">Register</button>
      </form>
    </div>
  );
}
