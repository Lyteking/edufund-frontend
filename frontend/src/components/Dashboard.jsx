import { useEffect, useState } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch users
  const fetchUsers = async () => {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No access token found, user is not authenticated.");
      setError("Authentication failed. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        console.warn("Token expired or invalid. Attempting refresh...");
        token = await refreshAccessToken(); // Get a fresh token
        if (!token) return; // If refresh failed, do not retry
        return fetchUsers(); // Retry with new token
      }

      if (response.status === 403) {
        console.warn("User does not have permission to access this resource.");
        setError("You do not have permission to view this data.");
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setError("Failed to fetch users. Please try again.");
    }
  };

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.warn("No refresh token found. Logging out...");
      handleLogout();
      return null;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        console.error("Token refresh failed. Logging out...");
        handleLogout();
        return null;
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      return data.access; // Return the new token
    } catch (error) {
      console.error("Error refreshing token:", error);
      handleLogout();
      return null;
    }
  };

  // Function to log out the user
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  // Fetch users when component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {error ? <p>{error}</p> : users.map(user => <p key={user.id}>{user.username}</p>)}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
