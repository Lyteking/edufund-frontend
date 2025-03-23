import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // State for the selected filter
  const navigate = useNavigate();

  // Function to fetch all donations (handles pagination)
  const fetchAllDonations = async (url) => {
    let allDonations = [];
    let nextUrl = url;

    while (nextUrl) {
      try {
        const response = await axios.get(nextUrl);
        allDonations = [...allDonations, ...response.data.results];
        nextUrl = response.data.next; // Update nextUrl to the next page
      } catch (error) {
        console.error('Error fetching donations:', error);
        throw error;
      }
    }

    return allDonations;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch campaigns
        const campaignsResponse = await axios.get('https://edufund-1ved.onrender.com/api/funding-campaign/');
        console.log('Campaigns API Response:', campaignsResponse.data);

        // Fetch all donations (including paginated results)
        const allDonations = await fetchAllDonations('https://edufund-1ved.onrender.com/api/anonymous-donation/');
        console.log('All Donations:', allDonations);

        if (campaignsResponse.data && Array.isArray(campaignsResponse.data.results)) {
          const campaignsData = campaignsResponse.data.results;

          // Calculate amount_raised for each campaign
          const updatedCampaigns = campaignsData.map((campaign) => {
            const campaignDonations = allDonations.filter(
              (donation) => donation.funding_campaign === campaign.pk
            );

            const amountRaised = campaignDonations.reduce(
              (sum, donation) => sum + (parseFloat(donation.amount) || 0),
              0
            );

            return {
              ...campaign,
              amount_raised: amountRaised,
              amount: parseFloat(campaign.amount) || 0,
            };
          });

          // Update campaigns state
          setCampaigns(updatedCampaigns);
        } else {
          throw new Error('Invalid API response format: Expected `results` array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to filter campaigns based on the selected price range
  const filterCampaigns = (campaigns, filter) => {
    switch (filter) {
      case '0-100000':
        return campaigns.filter((campaign) => campaign.amount < 100000);
      case '100000-500000':
        return campaigns.filter((campaign) => campaign.amount >= 100000 && campaign.amount < 500000);
      case '500000-1000000':
        return campaigns.filter((campaign) => campaign.amount >= 500000 && campaign.amount < 1000000);
      case '1000000+':
        return campaigns.filter((campaign) => campaign.amount >= 1000000);
      default:
        return campaigns; // Show all campaigns
    }
  };

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

  // Filter campaigns based on the selected filter
  const filteredCampaigns = filterCampaigns(campaigns, filter);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <div className="sticky w-full top-0 bg-white z-0 p-4">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <div className="flex justify-end mt-2">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Campaigns</option>
              <option value="0-100000">₦0 - ₦100,000</option>
              <option value="100000-500000">₦100,000 - ₦500,000</option>
              <option value="500000-1000000">₦500,000 - ₦1,000,000</option>
              <option value="1000000+">₦1,000,000+</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto w-8/10 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {filteredCampaigns.map((campaign) => {
            const progressPercentage = calculateProgress(campaign.amount_raised, campaign.amount);

            return (
              <div
                key={campaign.pk}
                className="bg-gray-100 items-start justify-start flex-col sm:w-8/10 md:w-full rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                onClick={() => handleCampaignClick(campaign)}
              >
                <h3 className="text-xl font-bold mb-2">Name: {campaign.name}</h3>
                <p className="text-gray-600 mb-2">Reason: {campaign.reason || "No reason"}</p>
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
            <p className="text-gray-600 font-bold mb-4">Reason: {selectedCampaign.reason || 'No reason'}</p>
            <p className="text-gray-600 mb-2">Description: {selectedCampaign.description || 'No description'}</p>

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