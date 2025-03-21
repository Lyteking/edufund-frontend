import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 
import image from "../assets/signupbg.jpeg"; 

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const payload = { username, password };
      console.log("Request Payload:", payload); 

      const response = await axios.post("https://edufund-1ved.onrender.com/api/login/", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login Response:", response.data); 
      const userData = {
        name: response.data.user.first_name, 
        email: response.data.user.email,
      };
      if (response.data.tokens.access && response.data.tokens.refresh) {
        console.log('fucking the coco')
        localStorage.setItem('accessToken', response.data.tokens.access);
        localStorage.setItem('refreshToken', response.data.tokens.refresh);
        login(response.data.tokens.access, response.data.tokens.refresh, userData);
      }

      navigate("/dashboard");
      
    } catch (error) {
      console.error("Login Error:", error);

      
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
        setError(error.response.data.error || "Login failed. Please check your credentials.");
      } else if (error.request) {
        console.error("No Response Received:", error.request);
        setError("Network error. Please check your connection.");
      } else {
        console.error("Request Setup Error:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="hidden md:block w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="h-full flex flex-col justify-center items-start w-full p-10 text-left text-white">
          <h1 className="text-4xl font-bold mb-4">
            Join the Movement to Change Education in Nigeria
          </h1>
          <p className="text-lg">
            Education is the foundation for a better future. Your support can
            provide essential learning materials, fund school programs, and
            create opportunities for children to reach their full potential.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full h-full px-8 md:px-28 flex flex-col py-35 items-center bg-white rounded-lg shadow-md overflow-auto scrollbar-hidden">
          <h2 className="text-mid md:text-big text-center mb-2">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-12">
            Start Changing Lives Through Education
          </p>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <form className="flex w-full flex-col flex-grow" onSubmit={handleSubmit}>
            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex-grow"></div>

            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="w-4/5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>

            <p className="text-center text-sm mt-6">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;