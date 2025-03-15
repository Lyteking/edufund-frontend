import React, { useState } from "react";
import axios from "axios";
import image from "../assets/signupbg.jpeg";

const SchoolSignupPage = () => {
  const [formData, setFormData] = useState({
    id_number: "",
    name: "",
    location: "",
    address: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/school/", formData);
      setMessage("School registered successfully!");
    } catch (error) {
      setMessage(error.response?.data?.detail || "School signup failed.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side (Image & Text) */}
      <div className="w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
        <div className="h-full flex flex-col justify-center items-start w-full p-10 text-left text-white">
          <h1 className="text-4xl font-bold mb-4">Register Your School</h1>
          <p className="text-lg">
            Join our educational network and provide better learning opportunities for students.
          </p>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="w-1/2 h-full flex justify-center items-center bg-gray-100">
        <div className="w-full h-screen flex-col px-28 py-35 items-center bg-white rounded-lg shadow-md overflow-auto scrollbar-hidden">
          <h2 className="text-big text-center -mb-2">School Registration</h2>
          <p className="text-center text-gray-600 mb-12">Let's get your school registered!</p>
          {message && <p className="text-red-500 text-center mb-2">{message}</p>}

          <form className="mt-12" onSubmit={handleSubmit}>
            {/* ID Number */}
            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">School ID Number</label>
              <input type="text" name="id_number" className="border border-gray-300 p-2 rounded-md w-full" value={formData.id_number} onChange={handleChange} required />
            </div>

            {/* Name */}
            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">School Name</label>
              <input type="text" name="name" className="border border-gray-300 p-2 rounded-md w-full" value={formData.name} onChange={handleChange} required />
            </div>

            {/* Location & Address */}
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Location</label>
                <input type="text" name="location" className="border border-gray-300 p-2 rounded-md w-full" value={formData.location} onChange={handleChange} required />
              </div>
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Address</label>
                <input type="text" name="address" className="border border-gray-300 p-2 rounded-md w-full" value={formData.address} onChange={handleChange} required />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea name="description" className="border border-gray-300 p-2 rounded-md w-full" value={formData.description} onChange={handleChange} required />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full">
              <button type="submit" className="w-4/5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Register School
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              Already registered? <a href="/login" className="text-blue-500">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchoolSignupPage;
