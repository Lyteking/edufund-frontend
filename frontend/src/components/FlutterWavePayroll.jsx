import React, { useState } from "react";
import { PaystackButton } from "react-paystack";

const PaystackPayment = () => {
  const publicKey = "pk_test_c97495e63115104b8fb29d3b641a2b331e154632"; // Replace with your actual public key
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleSuccess = (response) => {
    console.log("Payment Successful:", response);
    alert("Payment Successful!");
    // You can also send the transaction reference to your backend for verification
  };

  const handleClose = () => {
    console.log("Payment window closed");
  };

  return (
    <div>
      <h2>Pay with Paystack</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <PaystackButton
        email={email}
        amount={amount * 100} // Convert to kobo
        publicKey={publicKey}
        text="Pay Now"
        onSuccess={handleSuccess}
        onClose={handleClose}
      />
    </div>
  );
};

export default PaystackPayment;
