import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '../assets/Logo';

const DonationPage = ({ setCampaign }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { campaign } = location.state || {}; 
  const publicKey = "pk_test_c97495e63115104b8fb29d3b641a2b331e154632";
  const [amount, setAmount] = useState(5000);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  const [error, setError] = useState(""); 

  const handleSuccess = async (response) => {
    try {
      // Step 1: Post the donation to the anonymous-donation endpoint
      const payload = {
        amount: amount,
        funding_campaign: campaign.pk, 
        email: email,
      };

      const donationResponse = await axios.post(
        "https://edufund-1ved.onrender.com/api/anonymous-donation/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Donation Successful:", donationResponse.data);


      setShowSuccessPopup(true);
      setTimeout(() => {
        navigate('/campaigns');
      }, 3000);
    } catch (error) {
      console.error("Error processing donation:", error);
      setError("Failed to process donation. Please try again.");
    }
  };

  const handleClose = () => {
    console.log("Payment window closed");
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const componentProps = {
    email,
    amount: amount * 100, 
    publicKey,
    text: "Pay Now",
    onSuccess: handleSuccess,
    onClose: handleClose,
    className: "w-full bg-purple-600 text-white py-3 rounded-md mt-4 font-medium",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#E5E8FF] p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-row justify-around items-center">
          <Logo />
          <div className="flex flex-col w-3/5 items-center">
            <h2 className="text-lg font-semibold mt-2">Your donation</h2>
            <div className="w-full overflow-x-auto flex-row items-start">
              <p className="text-2xl font-bold text-black">₦ {amount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <h3 className="text-sm md:text-md font-medium mt-4">Select Donation Amount</h3>
        <div className="text-sm md:text-md grid grid-cols-2 grid-rows-2 md:grid-cols-4 gap-2 my-2">
          {[5000, 10000, 20000, 50000].map((value) => (
            <button
              key={value}
              onClick={() => handleAmountChange(value)}
              className={`py-2 px-3 border rounded-md ${
                amount === value ? "bg-purple-600 text-white" : "bg-gray-200"
              }`}
            >
              ₦ {value.toLocaleString()}
            </button>
          ))}
        </div>

        <p className="text-sm mt-2">Or Enter Amount</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(Number(e.target.value))}
          className="w-full border rounded-md p-2 mt-1 text-center"
          min="100"
        />

        <label className="block text-left mt-3 text-sm font-medium">Name</label>
        <input
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <label className="block text-left mt-3 text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="Example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md p-2"
          required
        />

        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
            className="mr-2"
            id="anonymous-checkbox"
          />
          <label htmlFor="anonymous-checkbox" className="text-sm">Donate Anonymously</label>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-4">
          {email ? (
            <PaystackButton {...componentProps} />
          ) : (
            <button
              onClick={() => alert("Please enter your email address")}
              className="w-full bg-purple-600 text-white py-3 rounded-md mt-4 font-medium opacity-90"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Donation Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for your donation. You will be redirected to the campaigns page shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationPage;