import React, { useState } from "react";
import axios from "axios";
import image from '../assets/signupbg.jpeg'

const SchoolSignupPage = () => {
  const [formData, setFormData] = useState({
    idNumber: "",
    name: "",
    location: "",
    address: "",
    description: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/school/", {
        id_number: formData.idNumber,
        name: formData.name,
        location: formData.location,
        address: formData.address,
        description: formData.description,
        password: formData.password,
      });
      console.log("Signup Success:", response.data);
      setMessage("Signup successful! You can now log in.");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.detail || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
        <div className="h-full flex flex-col justify-center items-start w-full p-10 text-left text-white">
          <h1 className="text-4xl font-bold mb-4">Join Us in Building the Future of Education</h1>
          <p className="text-lg">
          Education is the foundation for a better future. Your support can provide essential learning materials, fund school programs, and create opportunities for children to reach their full potential.          </p>
        </div>
      </div>
      
      <div className="w-1/2 h-full flex justify-center items-center bg-gray-100">
        <div className="w-full h-screen flex-col px-28 py-35 items-center bg-white rounded-lg shadow-md overflow-auto scrollbar-hidden">
          <h2 className="text-big text-center -mb-2">Register Your School</h2>
          <p className="text-center text-gray-600 mb-12">Start Empowering Students Today!</p>
          {message && <p className="text-red-500 text-center mb-2">{message}</p>}
          
          <form className='mt-12' onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6 text-left">
                <label className="block text-gray-700 mb-2">School ID</label>
                <input type="text" name="idNumber" className="border border-gray-300 p-2 rounded-md w-full" value={formData.idNumber} onChange={handleChange} required />
              </div>
              <div className="mb-6 text-left">
                <label className="block text-gray-700 mb-2">School Name</label>
                <input type="text" name="name" className="border border-gray-300 p-2 rounded-md w-full" value={formData.name} onChange={handleChange} required />
              </div>
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-700 mb-2">Location</label>
              <input type="text" name="location" className="border border-gray-300 p-2 rounded-md w-full" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-700 mb-2">Address</label>
              <input type="text" name="address" className="border border-gray-300 p-2 rounded-md w-full" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea name="description" className="border border-gray-300 p-2 rounded-md w-full" value={formData.description} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-700 mb-2">Password</label>
              <input type="password" name="password" className="border border-gray-300 p-2 rounded-md w-full" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input type="password" name="confirmPassword" className="border border-gray-300 p-2 rounded-md w-full" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-sm">By signing up, you agree to our <a href="#" className="text-blue-500">Terms and Conditions</a></label>
            </div>
            <div className="flex justify-center w-full">
              <button type="submit" className="w-4/5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Continue to Verification</button>
            </div>
            <p className="text-center text-sm mt-4">Already registered? <a href="/login" className="text-blue-500">Log in</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchoolSignupPage;
