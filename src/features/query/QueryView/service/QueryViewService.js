import axiosInstance from "@/core/api/axiosInstance";

export const getQueryById = async (queryId) => {
  try {
    const response = await axiosInstance.get(`/query/show/${queryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching query:", error);
    throw error;
  }
};

export const getItineraries = async (userId) => {
  const res = await axiosInstance.get(`/itinerary/list`, {
    params: { user_id: userId },
  });
  return res.data;
};

export const createItinerary = async (userId, payload) => {
  const res = await axiosInstance.post(`/itinerary/store/${userId}`, payload);
  return res.data;
};

export const updateItinerary = async (id, payload) => {
  const res = await axiosInstance.put(`/itinerary/update/${id}`, payload);
  return res.data;
};

export const deleteItinerary = async (id) => {
  const res = await axiosInstance.delete(`/itinerary/delete/${id}`);
  return res.data;
};