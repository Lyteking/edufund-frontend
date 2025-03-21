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
    user_type: "SCHOOL",
  });

  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
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

  const isStrongPassword = (password) => {
    return /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStrongPassword(formData.password)) {
      setPasswordError("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

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
    formDataObj.append("address", formData.address);
    formDataObj.append("password", formData.password);
    formDataObj.append("password_confirm", formData.password_confirm);
    formDataObj.append("user_type", formData.user_type);
    

    try {
      const response = await axios.post("https://edufund-1ved.onrender.com/api/users/", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Signup Success:", response);
      setMessage("Signup successful! You will be redirected shortly.");
      console.log(response)
      navigate('/login')
      
      
        localStorage.setItem("isNewUser", "true"); 
      

     
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.detail || "Signup failed. Try again.");
    }
  };

  return (
    <div className="justify-center flex h-screen">
      <div className="hidden md:block md:w-1/2 md:h-screen md:bg-cover md:bg-center" style={{ backgroundImage: `url(${image})` }}>
        <div className="h-full flex flex-col justify-center items-start w-full p-10 text-left text-white">
          <h1 className="text-4xl font-bold mb-4">Join the Movement to Change Education in Nigeria</h1>
          <p className="text-lg">
            Education is the foundation for a better future. Your support can provide essential learning materials, fund school programs, and create opportunities for children to reach their full potential.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 md:h-full md:flex justify-center items-center bg-gray-100">
        <div className="p-8 w-full pb-30 h-screen flex-col md:px-8 md:py-15 lg:px-22 lg:py-35 items-center bg-white rounded-lg shadow-md overflow-auto scrollbar-hidden">
          <h2 className="text-mid md:text-big text-center -mb-2">Create Account</h2>
          <p className="text-center text-gray-600 mb-12">Let's get you started!</p>
          {message && <p className="text-red-500 text-center mb-2">{message}</p>}

          <form className="mt-12" onSubmit={handleSubmit}>
            <div className="block md:grid md:grid-cols-2 md:gap-4">
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">First Name</label>
                <input type="text" name="first_name" className="border border-gray-300 p-2 rounded-md w-full" value={formData.first_name} onChange={handleChange} required />
              </div>
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input type="text" name="last_name" className="border border-gray-300 p-2 rounded-md w-full" value={formData.last_name} onChange={handleChange} required />
              </div>
            </div>

            <div className="block md:grid md:grid-cols-2 md:gap-4">
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" name="email" className="border border-gray-300 p-2 rounded-md w-full" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input type="text" name="phone" className="border border-gray-300 p-2 rounded-md w-full" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>


            <div className="block md:grid">
              <div className="mb-6 flex-col text-left">
                <label className="block text-gray-700 mb-2">Address</label>
                <input type="text" name="address" className="border border-gray-300 p-2 rounded-md w-full" value={formData.address} onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="border border-gray-300 p-2 rounded-md w-full pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
 <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
}
                </span>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <div className="mb-6 flex-col text-left">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirm"
                  className="border border-gray-300 p-2 rounded-md w-full pr-10"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  required
                />
                <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
 <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
}
                </span>
              </div>
            </div>

            <div className="flex flex-grow"></div>

            <div className="flex justify-center md:mt-auto w-full">
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