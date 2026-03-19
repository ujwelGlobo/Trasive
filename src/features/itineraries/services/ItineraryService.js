import axiosInstance from "@/core/api/axiosInstance";

export const createItinerary = async (payload) => {
  const response = await axiosInstance.post(`/additinerary`, payload);
  return response.data;
};

export const updateItinerary = async (id, payload) => {
  const response = await axiosInstance.put(`/itinerary/${id}`, payload);
  return response.data;
};

export const getItinerary = async (userId) => {
  const response = await axiosInstance.get(`/view/${userId}`);
  return response.data;
};