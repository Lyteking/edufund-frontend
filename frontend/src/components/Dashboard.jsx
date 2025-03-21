import { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { logout, isAuthenticated, user, authTokens } = useAuth(); 
  const [schools, setSchools] = useState([]); // State to store registered schools

  // Fetch registered schools for the user
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/school/", {
          headers: {
            Authorization: `Bearer ${authTokens.accessToken}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          // Filter schools belonging to the current user
          setSchools(response.data.filter(school => school.user === user.id));
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, [authTokens.accessToken, user.id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Welcome, {user?.name}!</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Check Campaigns Card */}
        <Link to="/dashboard/check-campaigns" className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <h2 className="text-xl font-semibold mb-4">Check Campaigns</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </Link>

        {/* Create Campaign Card */}
        <Link to="/dashboard/create-campaign" className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <h2 className="text-xl font-semibold mb-4">Create Campaign</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </Link>

        {schools.length === 0 && (
          <Link to="/dashboard/register-school" className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <h2 className="text-xl font-semibold mb-4">Register School</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </Link>
        )}
      </div>

      {isAuthenticated && (
        <button
          onClick={logout}
          className="mt-8 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Dashboard;