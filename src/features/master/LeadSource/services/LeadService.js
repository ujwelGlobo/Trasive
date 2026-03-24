import axiosInstance from "@/core/api/axiosInstance";

export const createdLeadSource = async (userId, payload) => {
  const response = await axiosInstance.post(`/lead/${userId}`, payload);
  return response.data;
};

export const UpdatedLeadSource = async (id, payload) => {
  const response = await axiosInstance.put(`/lead/${id}`, payload);
  return response.data;
};

export const getLeadSource = async (userId) => {
  const response = await axiosInstance.get(`/lead/${userId}`);
  return response.data;
};