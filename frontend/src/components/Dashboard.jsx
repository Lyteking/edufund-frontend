import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import logout from "../api/Logout";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("users/");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please log in again.");
        console.error("Fetch error:", err.response?.data || err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
