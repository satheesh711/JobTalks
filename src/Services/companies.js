import axios from "axios";
const BASE_URL = "https://jobtalksbackend.onrender.com/companies";

export const getCompanyByid = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const incrementLikes = async (reviewId, companyId, userId) => {
  const response = await axios.put(`${BASE_URL}/${companyId}/review/${reviewId}/like`, { userId });
  return response.data;
};

export const decrementLikes = async (reviewId, companyId, userId) => {
  const response = await axios.put(`${BASE_URL}/${companyId}/review/${reviewId}/unlike`, { userId });
  return response.data;
};

export const getAllReviews = async () => {
  const response = await axios.get(`${BASE_URL}/reviews/all`);
  return response.data;
};

export const companies = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addReview = async (review, id) => {
  const response = await axios.put(`${BASE_URL}/${id}/review`, review);
  return response.data;
};

export const addRole = async (role, id) => {
  const response = await axios.put(`${BASE_URL}/${id}/role`, role);
  return response.data;
};

export const getAllRoles = async () => {
  const response = await axios.get(`${BASE_URL}/roles/all`);
  return response.data;
};

export const getCompanyRoles = async (companyId) => {
  const response = await axios.get(`${BASE_URL}/${companyId}/roles`);
  return response.data;
};

export const getCompanyReviews = async (companyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${companyId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company reviews:', error);
    return [];
  }
};

export const checkCompany = async (newCompany) => {
  const response = await axios.get(`${BASE_URL}/check/${newCompany.slug}`);
  return response.data.exists;
};

export const addCompany = async (company) => {
  await axios.post(BASE_URL, company);
};

export const getSalaryInsights = async () => {
  const response = await axios.get(`${BASE_URL}/salaryInsights`);
  return response.data;
};
