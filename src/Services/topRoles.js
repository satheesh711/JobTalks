import { getAllRoles } from "./companies";

export const getTopRolesList = async () => {
  const response = await getAllRoles();
  response.sort((a, b) => b.salaryRange.max - a.salaryRange.max);
  return response.slice(0, 6);
};
