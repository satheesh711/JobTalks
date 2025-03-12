import { create } from 'zustand';
import { companies, roles, reviews } from '../data/data';

const useCompanyStore = create((set) => ({
  companies: companies,
  roles: roles,
  reviews: reviews,
  searchFilters: {
    query: '',
    industry: '',
    location: '',
    rating: 0,
    minSalary: 0,
    maxSalary: 0,
    employmentStatus: ''
  },

  addCompany: (company) => 
    set((state) => ({
      companies: [...state.companies, { ...company, id: state.companies.length + 1 }]
    })),

  addReview: (review) =>
    set((state) => ({
      reviews: [...state.reviews, { ...review, id: state.reviews.length + 1 }]
    })),

  addRole: (role) =>
    set((state) => ({
      roles: [...state.roles, { ...role, id: state.roles.length + 1 }]
    })),

  updateSearchFilters: (filters) =>
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters }
    })),

  getCompanyById: (id) => {
    const state = useCompanyStore.getState();
    return state.companies.find(company => company.id === id);
  },

  getCompanyReviews: (companyId) => {
    const state = useCompanyStore.getState();
    return state.reviews.filter(review => review.companyId === companyId);
  },

  getCompanyRoles: (companyId) => {
    const state = useCompanyStore.getState();
    return state.roles.filter(role => role.companyId === companyId);
  }
}));

export default useCompanyStore;