import axiosInstance from "@/core/api/axiosInstance";

export const getDestinations = async (userId) => {
  const response = await axiosInstance.get(`/destination/${userId}`);
  return response.data;
};

export const createDestination = async (payload) => {
  const response = await axiosInstance.post(`/destination/${payload.user_id}`, payload);
  return response.data;
};

export const updateDestination = async (id, payload) => {
  const response = await axiosInstance.put(`/destination/${id}`, payload);
  return response.data;
};