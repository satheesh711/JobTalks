import axios from "axios";
const BASE_URL = "http://localhost:3000/topRoles";

export const getTopRolesList = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
