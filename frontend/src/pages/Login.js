import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      navigate("/");
    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="container mt-4 col-md-4">
      <h3>Login</h3>

      <form onSubmit={submit}>
        <label>Email</label>
        <input className="form-control"
               value={email}
               onChange={(e) => setEmail(e.target.value)} />

        <label className="mt-2">Password</label>
        <input className="form-control"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-primary mt-3 w-100">Login</button>
      </form>
    </div>
  );
}
