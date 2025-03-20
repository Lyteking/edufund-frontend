import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useLocation, useNavigate } from "react-router-dom"; 

const DonationPage = ({ setCampaign }) => {
  const location = useLocation();
  // const { campaign } = location.state 
  const navigate = useNavigate();
  const publicKey = "pk_test_c97495e63115104b8fb29d3b641a2b331e154632"; 
  const [amount, setAmount] = useState(5000);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSuccess = (response) => {
    console.log("Payment Successful:", response);

    if (!campaign) {
      console.error("Campaign data is missing.");
      return;
    }

    const amountNumber = Number(amount) || 0;
    const campaignAmountNumber = Number(campaign.amount) || 1;

    const fundingProgression = `${((amountNumber) / campaignAmountNumber) * 100}%`;

    const updatedCampaign = {
      ...campaign,
      amount: campaign.amount + amountNumber, 
      // funding_progression: fundingProgression, // Update the progress percentage
    };

    console.log("Updated Campaign:", updatedCampaign);

    setCampaign(updatedCampaign);

    navigate('/campaigns');
    console.log('redirected');
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
    className: "w-full bg-purple-600 text-white py-3 rounded-md mt-4 font-medium"
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#E5E8FF] p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-row justify-around items-center">
          <svg className="w-30 h-15" width="84" height="107" viewBox="0 0 84 107" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* SVG Paths */}
          </svg>         
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
    </div>
  );
};

export default DonationPage;