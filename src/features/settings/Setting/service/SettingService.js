import axiosInstance from "@/core/api/axiosInstance";

export const getOrganization = async (userId) => {
  return axiosInstance.get(`/orglist/${userId}`);
};

export const updateOrganization = async (id, data) => {
  return axiosInstance.post(`/orgupdate/${id}`, data);
};

export const getOrganizationLogo = async (id) => {
  return axiosInstance.get(`/orglogo/${id}`);
};