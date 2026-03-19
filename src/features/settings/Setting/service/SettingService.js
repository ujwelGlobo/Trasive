import axiosInstance from "@/core/api/axiosInstance";

export const getOrganization = async (userId) => {
  const response = await axiosInstance.get(`/organization/${userId}`);
  return response.data;
};

export const getOrgLogoUrl = (logoFilename) => {
  if (!logoFilename) return "/logo.png";
  return `${axiosInstance.defaults.baseURL}/storage/${logoFilename}`;
};