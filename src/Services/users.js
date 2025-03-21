import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export const getUsers = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
export const getUser = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id, data) => {
  await axios.put(`${BASE_URL}/${id}`, data);
};

export const getUserId = async (email) =>
{
  const response = await getUsers()
  return response.find(user => user.email === email).id
}

export const addUser = async (user) => {
  await axios.post(BASE_URL, user);
};

export const checkUserExists = async (email) => {
  const users = await getUsers();
  return users.some(user => user.email === email);
};

export const checkCredentials = async (email,password) => {
  const users = await getUsers();
  return users.some(user => (user.email === email) && (user.password === password));
};

export const guestLogin =async (defaultData={
  name: "Guest User",
  email: "guest@example.com",
  method: "guest",
}) => {
  try {
    const response = await axios.get(BASE_URL);
    const users = response.data;

    const existingUser = users.find(user => user.email === "guest@example.com");

    if (existingUser) {
      const updatedUser = await axios.put(`${BASE_URL}/${existingUser.id}`, defaultData);
      return updatedUser;
    } else {
      const newGuest = {
        id: Date.now().toString(),
        ...defaultData
      };
      const createdUser = await axios.post(BASE_URL, newGuest);
      return true
    }
  } catch (error) {
    console.error("Error handling guest login:", error);
    return false
  }
}