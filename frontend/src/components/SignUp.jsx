import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/signupbg.jpeg";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    password: "",
    password_confirm: "",
    logo: null,
    user_type: "",
  });

  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("No file chosen");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      const file = e.target.files[0];
      setFormData({ ...formData, logo: file });
      setFileName(file ? file.name : "No file chosen");
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.password_confirm) {
      setMessage("Passwords do not match");
      return;
    }
  
    let website = formData.website.trim();
    if (website && !website.startsWith("http://") && !website.startsWith("https://")) {
      website = "https://" + website;
    }
  
    const formDataObj = new FormData();
    formDataObj.append("first_name", formData.first_name);
    formDataObj.append("last_name", formData.last_name);
    formDataObj.append("email", formData.email);
    formDataObj.append("phone", formData.phone);
    formDataObj.append("website", website || "");
    formDataObj.append("address", formData.address);
    formDataObj.append("password", formData.password);
    formDataObj.append("password_confirm", formData.password_confirm);
    formDataObj.append("user_type", formData.user_type); 
    if (formData.logo) {
      formDataObj.append("logo", formData.logo);
    }
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Signup Success:", response.data);
      setMessage("Signup successful! Redirecting...");
  
      if (response.data.access && response.data.refresh) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        console.log("Tokens saved successfully!");
      } else {
        console.error("Tokens are missing in response:", response.data);
      }
  
      if (formData.user_type === "SCHOOL") {
        navigate("/signup/school");
      } else if (formData.user_type === "SPONSOR") {
        navigate("/signup/sponsor");
      } else {
        navigate("/default-signup");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.detail || "Signup failed. Try again.");
    }
  };
  

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
        <div className="h-full flex flex-col justify-center items-start w-full p-10 text-left text-white">
          <h1 className="text-4xl font-bold mb-4">Join the Movement to Change Education in Nigeria</h1>
          <p className="text-lg">
            Education is the foundation for a better future. Your support can provide essential learning materials, fund school programs, and create opportunities for children to reach their full potential.
          </p>
        </div>
      </div>

      <div className="w-1/2 h-full flex justify-center items-center bg-gray-100">
        <div className="w-full h-screen flex-col px-28 py-35 items-center bg-white rounded-lg shadow-md overflow-auto scrollbar-hidden">
          <h2 className="text-big text-center -mb-2">Create Account</h2>
          <p className="text-center text-gray-600 mb-12">Let's get you started!</p>
          {message && <p className="text-red-500 text-center mb-2">{message}</p>}

          <form className="mt-12" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">First Name</label>
                <input type="text" name="first_name" className="border border-gray-300 p-2 rounded-md w-full" value={formData.first_name} onChange={handleChange} required />
              </div>
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input type="text" name="last_name" className="border border-gray-300 p-2 rounded-md w-full" value={formData.last_name} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" name="email" className="border border-gray-300 p-2 rounded-md w-full" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input type="text" name="phone" className="border border-gray-300 p-2 rounded-md w-full" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">User Type</label>
              <select name="user_type" className="border border-gray-300 p-2 rounded-md w-full" value={formData.user_type} onChange={handleChange} required>
                <option value="">Select User Type</option>
                <option value="SCHOOL">School</option>
                <option value="SPONSOR">Sponsor</option>
                <option value="GUEST">Guest</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Website</label>
                <input type="text" name="website" className="border border-gray-300 p-2 rounded-md w-full" value={formData.website} onChange={handleChange} />
              </div>
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Address</label>
                <input type="text" name="address" className="border border-gray-300 p-2 rounded-md w-full" value={formData.address} onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Password</label>
              <input type="password" name="password" className="border border-gray-300 p-2 rounded-md w-full" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input type="password" name="password_confirm" className="border border-gray-300 p-2 rounded-md w-full" value={formData.password_confirm} onChange={handleChange} required />
            </div>

            <div className="flex flex-grow"></div>
           

            <div className="flex justify-center mt-auto w-full">
              <button type="submit" className="w-4/5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
