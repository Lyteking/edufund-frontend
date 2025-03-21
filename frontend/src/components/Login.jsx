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
  const [showPassword, setShowPassword] = useState(false);
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </span>
              </div>
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