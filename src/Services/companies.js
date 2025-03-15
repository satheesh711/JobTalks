import axios from "axios";
const BASE_URL = "http://localhost:3000/companies";

export const companies = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getCompanyByid = async (id) => {
  const data = await companies();
  return data.find((company) => company.id === id)

}
export const getCompanyReviews = async (id) => {
  const data = await companies();
  return (data.find((company) => company.id === id).reviews)
}

export const getCompanyRoles = async (companyId) => {
  const data = await companies();
  return data.find(company => company.id === companyId).roles;
}

export const addReview = async (review, id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  const reviewsCount=data.reviewCount
  const updatedCompanyData = {
    ...data,
    reviews: [...(data.reviews || []), review],
    reviewCount : reviewsCount+ 1,
    rating : (((data.rating)*reviewsCount)+review.rating)/(reviewsCount+1)
  };

  const response=await axios.put(`${BASE_URL}/${id}`, updatedCompanyData);
  return response.data
}


export const addComapy = async (company) => {
  await axios.post(BASE_URL, company)
}
export const checkCompany = async (newCompany) => {
  const data = await companies();
  return data.some(company =>
    company.slug === newCompany.slug
  )
}

export const updateRating = async (newRating) =>
{

}