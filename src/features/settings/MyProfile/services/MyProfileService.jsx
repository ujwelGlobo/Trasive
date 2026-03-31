import axiosInstance from "@/core/api/axiosInstance";


export const getProfile = async (user_id) => {
  const response = await axiosInstance.get(`/users/${user_id}`);
  return response.data;
};