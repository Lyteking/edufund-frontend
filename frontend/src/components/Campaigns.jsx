import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsResponse = await axios.get('https://edufund-1ved.onrender.com/api/funding-campaign/');
        console.log('Campaigns API Response:', campaignsResponse.data);
    
        if (campaignsResponse.data && Array.isArray(campaignsResponse.data.results)) {
          const campaignsData = campaignsResponse.data.results;
    
          setCampaigns(campaignsData.map(campaign => ({
            ...campaign,
            amount_raised: "loading .", 
            amount: parseFloat(campaign.amount) || 0,
          })));
    
          // Start the "Fetching ...." animation
          const interval = setInterval(() => {
            setCampaigns((prevCampaigns) =>
              prevCampaigns.map((campaign) => {
                if (typeof campaign.amount_raised === "string" && campaign.amount_raised.startsWith("loading")) {
                  const dots = campaign.amount_raised.split(" ")[1];
                  const newDots = dots.length < 3 ? dots + "." : ".";
                  return { ...campaign, amount_raised: `loading ${newDots}` };
                }
                return campaign;
              })
            );
          }, 500); 
    
          campaignsData.forEach(async (campaign) => {
            try {
              let totalAmountRaised = 0;
              let nextUrl = `https://edufund-1ved.onrender.com/api/anonymous-donation/?campaign=${campaign.pk}`;
    
              while (nextUrl) {
                const donationsResponse = await axios.get(nextUrl);
                console.log(`Donations for Campaign ${campaign.pk}:`, donationsResponse.data);
    
                const donations = donationsResponse.data.results;
    
                const pageAmountRaised = donations.reduce((sum, donation) => {
                  const amount = parseFloat(donation.amount) || 0;
                  return sum + amount;
                }, 0);
    
                totalAmountRaised += pageAmountRaised;
    
                nextUrl = donationsResponse.data.next;
              }
    
              setCampaigns((prevCampaigns) =>
                prevCampaigns.map((prevCampaign) =>
                  prevCampaign.pk === campaign.pk
                    ? { ...prevCampaign, amount_raised: totalAmountRaised }
                    : prevCampaign
                )
              );
            } catch (error) {
              console.error(`Error fetching donations for campaign ${campaign.pk}:`, error);
              setCampaigns((prevCampaigns) =>
                prevCampaigns.map((prevCampaign) =>
                  prevCampaign.pk === campaign.pk
                    ? { ...prevCampaign, amount_raised: "Error fetching donations" }
                    : prevCampaign
                )
              );
            }
          });
    
          setTimeout(() => clearInterval(interval), 10000); 
        } else {
          throw new Error('Invalid API response format: Expected `results` array');
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCloseModal = () => {
    setSelectedCampaign(null);
  };

  const handleDonateClick = (campaign) => {
    navigate('/donations', { state: { campaign } });
  };

  const calculateProgress = (amountRaised, amount) => {
    if (!amountRaised || !amount || amount === 0) return 0;
    return Math.min((amountRaised / amount) * 100, 100); 
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
  <div className="sticky w-full top-0 bg-white z-0 p-4">
    <h1 className="text-2xl font-bold">Campaigns</h1>
  </div>
  <div className="overflow-y-auto w-8/10 flex-1">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      {campaigns.map((campaign) => {
        const progressPercentage = calculateProgress(campaign.amount_raised, campaign.amount);

        return (
          <div
            key={campaign.pk}
            className="bg-gray-100 items-start justify-start flex-col sm:w-8/10 md:w-full rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            onClick={() => handleCampaignClick(campaign)}
          >
            <h3 className="text-xl font-bold mb-2">Name: {campaign.name}</h3>
            <p className="text-gray-600 mb-2">Description: {campaign.description || "No description"}</p>
            <p className="text-gray-600 mb-4">School: {campaign.school || "No school"}</p>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` || 0 }}
              ></div>
            </div>

            <div className="flex-col items-start justify-start text-sm">
              <p className="text-green-600">
                Raised: ₦{(campaign.amount_raised || 0).toLocaleString()}
              </p>
              <p className="text-gray-500">
                Target: ₦{(campaign.amount || 0).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>

      {selectedCampaign && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-100 shadow-lg rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Name: {selectedCampaign.name}</h2>
            <p className="text-gray-600 mb-1">Description: {selectedCampaign.description || 'No description'}</p>
            <p className="text-gray-600 mb-6">Reason: {selectedCampaign.reason || 'No reason'}</p>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(selectedCampaign.amount_raised, selectedCampaign.amount)}%` }}
              ></div>
            </div>
            <div className="flex-col items-start mb-4 justify-start text-sm">
              <p className="text-green-600">
                Raised: ₦{(selectedCampaign.amount_raised || 0).toLocaleString()}
              </p>
              <p className="text-gray-500">
                Target: ₦{(selectedCampaign.amount || 0).toLocaleString()}
              </p>
              </div>

            <div className="space-y-2 mb-6">
              <p className="text-gray-700">
                <span className="font-semibold">Schools:</span> {selectedCampaign.schools?.join(', ') || 'No schools'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">End Date:</span> {new Date(selectedCampaign.end_date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex-1"
                onClick={() => handleDonateClick(selectedCampaign)}
              >
                Donate Now
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;