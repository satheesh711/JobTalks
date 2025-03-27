import axios from "axios";
const BASE_URL = "https://jobtalksbackend.onrender.com/companies";

export const getTopCompaniesList = async () => {
  const response = await axios.get(BASE_URL);
  response.data.sort((a, b) => b.rating - a.rating);
  return response.data.slice(0, 6);
}