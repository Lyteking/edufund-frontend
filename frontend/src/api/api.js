import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Adjust to your backend URL

export const getSponsors = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/sponsor/");
    return response.data;
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }
};

export const getSponsorRepresentatives = async () => {
  try {
    const response = await axios.get(`${API_URL}/sponsor-representative/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sponsor representatives:", error);
    return [];
  }
};

export const getDonations = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/donation/");
    return response.data;
  } catch (error) {
    console.error("Error fetching donations:", error);
    return [];
  }
};
