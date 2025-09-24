// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import API from "../api/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fetch all users
  const fetchUsers = () => {
    API.get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  // Fetch logs
  const fetchLogs = () => {
    API.get("/admin/logs")
      .then((res) => {
        // Ensure logs is always an array
        setLogs(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
    fetchLogs();
  }, []);

  // Add user
  const addUser = () => {
    if (!email || !password) return alert("Enter email & password");
    API.post("/admin/add-user", { email, password })
      .then(() => {
        fetchUsers();
        setEmail("");
        setPassword("");
        alert("User added successfully");
      })
      .catch((err) => alert(err.response?.data?.message || "Failed"));
  };

  // Remove user
  const removeUser = (id) => {
    API.post("/admin/remove-user", { id })
      .then(() => fetchUsers())
      .catch((err) => alert(err.response?.data?.message || "Failed"));
  };

  // Reset balances
  const resetBalances = () => {
    API.post("/admin/reset-balance")
      .then(() => {
        fetchUsers();
        alert("All balances reset to 10,000");
      })
      .catch((err) => alert(err.response?.data?.message || "Failed"));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Add User</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </section>

      <section>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Wallet</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.walletBalance}</td>
                <td>
                  <button onClick={() => removeUser(u.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={resetBalances}>Reset All Balances</button>
      </section>

      <section>
        <h2>Activity Logs</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Action</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {(logs || []).map((log, idx) => (
              <tr key={idx}>
                <td>{log.userId}</td>
                <td>{log.action}</td>
                <td>{new Date(log.timestamp || log.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
