import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function CreateCampaign() {
  const { authTokens, user } = useAuth(); 
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schools, setSchools] = useState([]); 
  const [selectedSchool, setSelectedSchool] = useState(""); 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/school/", {
          headers: {
            Authorization: `Bearer ${authTokens.accessToken}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setSchools(response.data.filter((school) => school.user === user.id));
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, [authTokens.accessToken, user.id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString().split("T")[0];

      const payload = {
        name,
        reason,
        amount,
        start_date: currentDate,
        description,
        end_date: endDate,
        school: selectedSchool,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/funding-campaign/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.accessToken}`,
          },
        }
      );

      console.log("Campaign created successfully:", response.data);
      setShowSuccessPopup(true);

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.error("Error creating campaign:", error);
      setError("Failed to create campaign. Please try again.");
    }
  };

  if (schools.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">No School Registered</h2>
          <p className="text-gray-600 mb-6">
            Please go to the dashboard and register a school first.
          </p>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full md:w-1/2 h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full h-full px-8 sm-px-14 md:px-14 flex flex-col py-35 items-center bg-white rounded-lg shadow-md overflow-auto scrollbar-hidden">
          <h2 className="text-mid md:text-big text-center mb-2">Create Campaign</h2>

          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <form className="flex w-full flex-col flex-grow" onSubmit={handleCreate}>
            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Select School</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                required
              >
                <option value="">Select a school</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Campaign Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Reason</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Description</label>
              <input
                type="text"
                className="w-full px-4 py-2 h-22 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="flex-grow"></div>

            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="w-4/5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Campaign Created Successfully!</h2>
            <p className="text-gray-600 mb-6">You will be redirected to the login page in 5 seconds.</p>
          </div>
        </div>
      )}
    </div>
  );
}