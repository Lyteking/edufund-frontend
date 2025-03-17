import { useState } from "react";
import axios from "axios";

const FundingCampaignForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    reason: "",
    description: "",
    schools: [],
    sponsors: [],
    status: "open",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/funding-campaign/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      if (response.status === 201) {
        alert("Funding campaign created successfully!");
        setFormData({
          name: "",
          amount: "",
          reason: "",
          description: "",
          schools: [],
          sponsors: [],
          status: "open",
          start_date: "",
          end_date: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create the campaign. Please check your credentials.");
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create Funding Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border" required />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="w-full p-2 border" required />
        <input type="text" name="reason" value={formData.reason} onChange={handleChange} placeholder="Reason" className="w-full p-2 border" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border"></textarea>
        
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className="w-full p-2 border" />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="w-full p-2 border" />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default FundingCampaignForm;
