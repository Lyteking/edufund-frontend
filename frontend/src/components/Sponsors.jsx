import React, { useEffect, useState } from "react";
import { getSponsors } from "../api/api";

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSponsors();
        setSponsors(data);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Sponsors</h1>
      <ul>
        {sponsors.length > 0 ? (
          sponsors.map((sponsor) => (
            <li key={sponsor.id} className="border p-4 rounded-lg mb-2">
              <h2 className="text-xl font-semibold">{sponsor.name}</h2>
              <p>Email: {sponsor.email || "N/A"}</p>
              <p>Phone: {sponsor.phone || "N/A"}</p>
              {sponsor.logo && (
                <img src={sponsor.logo} alt="Logo" className="h-20 mt-2" />
              )}
            </li>
          ))
        ) : (
          <p>No sponsors available.</p>
        )}
      </ul>
    </div>
  );
};

export default Sponsors;
