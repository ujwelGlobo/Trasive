import axiosInstance from "@/core/api/axiosInstance";

export const getServiceTypes = async (userId) => {
  const response = await axiosInstance.get(`/servicetypes/${userId}`);
  return response.data;
};

export const createServiceType = async (userId, payload) => {
  const response = await axiosInstance.post(`/servicetypes/${userId}`, payload);
  return response.data;
};

export const updateServiceType = async (id, payload) => {
  const response = await axiosInstance.put(`/servicetypes/${id}`, payload);
  return response.data;
};

export const deleteServiceType = async (id) => {
  const response = await axiosInstance.delete(`/servicetypes/${id}`);
  return response.data;
};