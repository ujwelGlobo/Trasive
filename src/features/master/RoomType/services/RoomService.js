import axiosInstance from "@/core/api/axiosInstance";

export const getRoomTypes = async (userId) => {
  const response = await axiosInstance.get(`/roomtype/${userId}`);
  return response.data; // { status: true, data: [...] }
};

export const createRoomType = async (userId, payload) => {
  const response = await axiosInstance.post(`/roomtype/add/${userId}`, payload);
  return response.data;
};
export const updateRoomType = async (id, payload) => {
  const response = await axiosInstance.put(`/roomtype/update/${id}`, payload);
  return response.data;
};