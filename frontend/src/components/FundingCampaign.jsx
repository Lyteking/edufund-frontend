import React, { useState, useEffect } from "react";
import axios from "axios";

const FundingCampaignForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    reason: "",
    description: "",
    schools: [],
    sponsors: [],
    status: "",
    start_date: "",
    end_date: "",
  });

  const [schoolsList, setSchoolsList] = useState([]);
  const [sponsorsList, setSponsorsList] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch Schools and Sponsors from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsResponse = await axios.get("http://127.0.0.1:8000/api/school/");
        setSchoolsList(schoolsResponse.data);

        const sponsorsResponse = await axios.get("http://127.0.0.1:8000/api/sponsor/");
        setSponsorsList(sponsorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (e, field) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, [field]: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/funding-campaign/", formData);
      console.log("Funding Campaign Created:", response.data);
      setMessage("Funding campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error.response?.data || error.message);
      setMessage("Failed to create campaign. Check your inputs.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Funding Campaign</h2>
      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Campaign Name</label>
          <input
            type="text"
            name="name"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Reason</label>
          <input
            type="text"
            name="reason"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Schools Multi-Select */}
        <div className="mb-4">
          <label className="block text-gray-700">Select Schools</label>
          <select
            name="schools"
            className="border border-gray-300 p-2 rounded-md w-full"
            multiple
            onChange={(e) => handleMultiSelectChange(e, "schools")}
          >
            {schoolsList.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sponsors Multi-Select */}
        <div className="mb-4">
          <label className="block text-gray-700">Select Sponsors</label>
          <select
            name="sponsors"
            className="border border-gray-300 p-2 rounded-md w-full"
            multiple
            onChange={(e) => handleMultiSelectChange(e, "sponsors")}
          >
            {sponsorsList.map((sponsor) => (
              <option key={sponsor.id} value={sponsor.id}>
                {sponsor.first_name} {sponsor.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="start_date"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="end_date"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default FundingCampaignForm;
