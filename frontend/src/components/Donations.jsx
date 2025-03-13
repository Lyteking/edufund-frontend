import React, { useEffect, useState } from "react";
import { getDonations } from "../api/api";

const Donations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/donation/", { credentials: "include" })  
        .then(response => {
            console.log("Response:", response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Donations Data:", data); 
            setDonations(data);
        })
        .catch(error => {
            console.error("Error fetching donations:", error);
        });
}, []);

  console.log("Donations:", donations); // Debugging


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Donations</h1>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id} className="border p-4 rounded-lg mb-2">
            <p>Sponsor: {donation.sponsor.name}</p>
            <p>Amount: ${donation.amount}</p>
            <p>Date: {new Date(donation.date_added).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Donations;
