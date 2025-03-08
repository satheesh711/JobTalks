import axios from "axios";
const BASE_URL = "http://localhost:3000/topCompanies";

// Get top 3 companies
export const getTopCompaniesList = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
