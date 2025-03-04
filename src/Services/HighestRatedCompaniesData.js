import axios from "axios";
const BASE_URL = "http://localhost:3000/Highist_Rated_Companies";

// Get top 3 companies
export const getHighestCompaniesList = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
