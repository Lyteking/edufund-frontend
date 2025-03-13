import React, { useEffect, useState } from "react";
import { getSponsorRepresentatives } from "../api/api";

const SponsorRepresentatives = () => {
  const [representatives, setRepresentatives] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSponsorRepresentatives();
      setRepresentatives(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Sponsor Representatives</h1>
      <ul>
        {representatives.map((rep) => (
          <li key={rep.id} className="border p-4 rounded-lg mb-2">
            <h2 className="text-xl">{rep.first_name} {rep.last_name}</h2>
            <p>Role: {rep.role}</p>
            <p>Email: {rep.email}</p>
            <p>Phone: {rep.phone}</p>
            {rep.photo && <img src={rep.photo} alt="Photo" className="h-20 mt-2" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SponsorRepresentatives;
