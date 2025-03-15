// import { create } from 'zustand';
// import { companies, roles, reviews } from '../data/data';

// const useCompanyStore = create((set) => ({
//   companies: companies,
//   roles: roles,
//   reviews: reviews,
//   searchFilters: {
//     query: '',
//     industry: '',
//     location: '',
//     rating: 0,
//     minSalary: 0,
//     maxSalary: 0,
//     employmentStatus: ''
//   },

//   addRole: (role) =>
//     set((state) => ({
//       roles: [...state.roles, { ...role, id: state.roles.length + 1 }]
//     })),

//   updateSearchFilters: (filters) =>
//     set((state) => ({
//       searchFilters: { ...state.searchFilters, ...filters }
//     })),




// export default useCompanyStore;