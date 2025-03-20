import axios from "axios";
const BASE_URL = "http://localhost:3000/companies";

export const companies = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getCompanyByid = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;

}
export const getCompanyReviews = async (id) => {
  const data = await companies();
  return (data.find((company) => company.id === id).reviews) || []
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
  const companiesdata = await companies();
  const roles = [];
  
  companiesdata.forEach(company => {
    if (company.roles && Array.isArray(company.roles)) {
      company.roles.forEach(role => {
        // Add company information to each role
        roles.push({
          ...role,
          companyId: company.id,
          companyLogo: company.logo,
          companyName: company.name,
          location: company.location
        });
      });
    }
  });
  return roles;
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

// export const incrementLikes = async (reviewId, companyId, userId) => {
//   const { data } = await axios.get(`${BASE_URL}/${companyId}`);

//   const updatedCompanyData = {
//     ...data,
//     reviews: data.reviews.map((review) =>
//       review.id === reviewId
//         ? { 
//             ...review, 
//             helpful: review.likedBy.includes(userId) 
//               ? review.helpful // Already liked, don't increment
//               : review.helpful + 1,
//             likedBy: review.likedBy.includes(userId) 
//               ? review.likedBy // Prevent duplicates
//               : [...review.likedBy, userId] 
//           }
//         : review
//     )
//   };

//   const response = await axios.put(`${BASE_URL}/${companyId}`, updatedCompanyData);
//   return response.data;
// };

// export const decrementLikes = async (reviewId, companyId, userId) => {
//   const { data } = await axios.get(`${BASE_URL}/${companyId}`);

//   const updatedCompanyData = {
//     ...data,
//     reviews: data.reviews.map((review) =>
//       review.id === reviewId
//         ? { 
//             ...review, 
//             helpful: review.likedBy.includes(userId) 
//               ? review.helpful - 1 
//               : review.helpful,
//             likedBy: review.likedBy.filter(id => id !== userId) 
//           }
//         : review
//     )
//   };

//   const response = await axios.put(`${BASE_URL}/${companyId}`, updatedCompanyData);
//   return response.data;
// };


export const getSalaryInsights = async () => {
  const companies = await companies();
  const insights = [];
  
  companies.forEach(company => {
    if (company.roles && Array.isArray(company.roles)) {
      company.roles.forEach(role => {
        // Create a salary insight for the average of the role's salary range
        const avgSalary = (role.salaryRange.min + role.salaryRange.max) / 2;
        
        insights.push({
          id: `${company.id}-${role.id}`,
          companyId: company.id,
          companyName: company.name,
          role: role.title,
          department: role.department,
          amount: avgSalary,
          minAmount: role.salaryRange.min,
          maxAmount: role.salaryRange.max,
          location: company.location,
          experience: "Based on role requirements",
          benefits: role.benefits,
          requirements: role.requirements,
          date: new Date().toISOString(),
          currency: role.salaryRange.currency || "USD"
        });
      });
    }
  });
  
  return insights;
};


export const incrementLikes = async (reviewId, companyId, userId) => {
  const company = await getCompanyByid(companyId);
  
  // Find the review
  const reviewIndex = company.reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex !== -1) {
    // Initialize likedBy array if it doesn't exist
    if (!company.reviews[reviewIndex].likedBy) {
      company.reviews[reviewIndex].likedBy = [];
    }
    
    // Add user to likedBy array and increment helpful count
    company.reviews[reviewIndex].likedBy.push(userId);
    company.reviews[reviewIndex].helpful += 1;
    
    // Update the company
    await axios.put(`${BASE_URL}/${companyId}`, company);
  }
};

// Decrement likes for a review
export const decrementLikes = async (reviewId, companyId, userId) => {
  const company = await getCompanyByid(companyId);
  
  // Find the review
  const reviewIndex = company.reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex !== -1 && company.reviews[reviewIndex].likedBy) {
    // Remove user from likedBy array
    company.reviews[reviewIndex].likedBy = company.reviews[reviewIndex].likedBy.filter(
      id => id !== userId
    );
    
    // Decrement helpful count, but not below 0
    company.reviews[reviewIndex].helpful = Math.max(0, company.reviews[reviewIndex].helpful - 1);
    
    // Update the company
    await axios.put(`${BASE_URL}/${companyId}`,company)
    }
    }