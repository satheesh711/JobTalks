import axios from "axios";

const BASE_URL = "https://jobtalksbackend.onrender.com/users";

export const checkUserExists = async (email) => {
  const response = await axios.get(`${BASE_URL}/exists/${email}`);
  return response.data.exists;
};

export const addUser = async (user) => {
  await axios.post(BASE_URL, user);
};

export const getUserId = async (email) => {
  const response = await axios.get(`${BASE_URL}/userId/${email}`);
  return response.data.userId;
};

export const getUser = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const registerUser = async (user) => {
  const response =await axios.post(`${BASE_URL}/register`, user);
  return response.data;
};


export const checkCredentials = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/check-credentials`, {
    email,
    password
  });
  return response.data.token;
};

export const updateUser = async (id, data) => {
  await axios.put(`${BASE_URL}/${id}`, data);
};

export const guestLogin = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/guest-login`);
    return response.data;
  } catch (error) {
    console.error("Error handling guest login:", error);
    return false;
  }
};