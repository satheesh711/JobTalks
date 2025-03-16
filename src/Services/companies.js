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

export const getAllRoles = async () => {
  const data = await companies();
  return data.reduce((acc, obj) => {
    if (Array.isArray(obj.roles) && obj.roles.length > 0) {
      const rolesWithCompanyId = obj.roles.map(role => ({
        ...role, 
        companyId: obj.id  // Adding company ID to each role
      }));
      acc.push(...rolesWithCompanyId);
    }
    return acc;
  }, []);
};

export const getAllReviews = async () => {
  const data = await companies();
  return data.reduce((acc, obj) => {
    if (Array.isArray(obj.reviews) && obj.reviews.length > 0) {
      const reviewsWithCompanyId = obj.reviews.map(review => ({
        ...review, 
        companyId: obj.id,
        companyName : obj.name
      }));
      acc.push(...reviewsWithCompanyId);
    }
    return acc;
  }, []);
};

export const incrementLikes = async (reviewId, companyId, userId) => {
  const { data } = await axios.get(`${BASE_URL}/${companyId}`);

  const updatedCompanyData = {
    ...data,
    reviews: data.reviews.map((review) =>
      review.id === reviewId
        ? { 
            ...review, 
            helpful: review.likedBy.includes(userId) 
              ? review.helpful // Already liked, don't increment
              : review.helpful + 1,
            likedBy: review.likedBy.includes(userId) 
              ? review.likedBy // Prevent duplicates
              : [...review.likedBy, userId] 
          }
        : review
    )
  };

  const response = await axios.put(`${BASE_URL}/${companyId}`, updatedCompanyData);
  return response.data;
};

export const decrementLikes = async (reviewId, companyId, userId) => {
  const { data } = await axios.get(`${BASE_URL}/${companyId}`);

  const updatedCompanyData = {
    ...data,
    reviews: data.reviews.map((review) =>
      review.id === reviewId
        ? { 
            ...review, 
            helpful: review.likedBy.includes(userId) 
              ? review.helpful - 1 
              : review.helpful,
            likedBy: review.likedBy.filter(id => id !== userId) 
          }
        : review
    )
  };

  const response = await axios.put(`${BASE_URL}/${companyId}`, updatedCompanyData);
  return response.data;
};
