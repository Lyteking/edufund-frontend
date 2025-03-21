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

          const campaignsWithDonations = await Promise.all(
            campaignsData.map(async (campaign) => {
              try {
                const donationsResponse = await axios.get(
                  `https://edufund-1ved.onrender.com/api/anonymous-donation/?campaign=${campaign.pk}`
                );
                console.log(`Donations for Campaign ${campaign.pk}:`, donationsResponse.data);
                console.log(donationsResponse.data)

                const amountRaised = donationsResponse.data.amount

                return {
                  ...campaign,
                  amount_raised: amountRaised, 
                };
              } catch (error) {
                console.error(`Error fetching donations for campaign ${campaign.pk}:`, error);
                return {
                  ...campaign,
                  amount_raised: 0, // Default to 0 if donations cannot be fetched
                };
              }
            })
          );

          setCampaigns(campaignsWithDonations);
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

  const calculateProgress = (amountRaised, target) => {
    if (!amountRaised || !target || target === 0) return 0;
    return (amountRaised / target) * 100;
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => {
          const progressPercentage = calculateProgress(campaign.amount_raised, campaign.target);

          return (
            <div
              key={campaign.pk}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => handleCampaignClick(campaign)}
            >
              <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
              <p className="text-gray-600 mb-4">{campaign.description}</p>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-sm">
                <p className="text-green-600">Raised: ₦{campaign.amount_raised}</p>
                <p className="text-gray-500">Target: ₦{campaign.target}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">{selectedCampaign.name}</h2>
            <p className="text-gray-600 mb-6">{selectedCampaign.description}</p>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(selectedCampaign.amount_raised, selectedCampaign.target)}%` }}
              ></div>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-gray-700">
                <span className="font-semibold">Schools:</span> {selectedCampaign.schools?.join(', ') || 'No schools'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Sponsors:</span> {selectedCampaign.sponsors?.join(', ') || 'No sponsors'}
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