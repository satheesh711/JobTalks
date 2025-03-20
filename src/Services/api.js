// filepath: c:\Users\sathe\OneDrive\Desktop\Git_hub\jobtalks\src\Services\api.js
const BASE_URL = 'https://your-vercel-url.vercel.app';

export const getCompanies = async () => {
  const response = await fetch(`${BASE_URL}/companies`);
  const data = await response.json();
  return data;
};
