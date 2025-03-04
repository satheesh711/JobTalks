import axios from "axios";
const BASE_URL = "http://localhost:3000/Highist_Rated_Roles";

// Get top 3 roles
export const getHighestListRoles = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
