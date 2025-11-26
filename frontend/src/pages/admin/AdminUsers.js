import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await API.get("/admin/users");
    setUsers(data);
  };

  const remove = async (id) => {
    if (window.confirm("Delete user?")) {
      await API.delete(`/admin/users/${id}`);
      load();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") navigate("/jobs");
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h3>All Users</h3>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className="badge bg-info">{u.role}</span>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => remove(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
