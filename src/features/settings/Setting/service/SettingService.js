import axiosInstance from "@/core/api/axiosInstance";

export const getOrganization = async (userId) => {
  return axiosInstance.get(`/organization/${userId}`);
};

export const updateOrganization = async (id, data) => {
  return axiosInstance.post(`/organization/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};