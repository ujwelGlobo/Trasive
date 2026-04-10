import axiosInstance from "@/core/api/axiosInstance";

export const createItinerary = async (userId, payload) => {
  const finalPayload = {
    ...payload,
    user_id: userId,
  };

  console.log("FINAL PAYLOAD:", finalPayload); // 🔥 DEBUG

  const response = await axiosInstance.post(
    `/additinerary/${userId}`,
    finalPayload
  );

  return response.data;
};

export const updateItinerary = async (id, payload) => {
  const response = await axiosInstance.put(`/update/${id}`, payload);
  return response.data;
};

export const getItinerary = async (userId) => {
  const response = await axiosInstance.get(`/itineraryview/${userId}`);
  return response.data;
};