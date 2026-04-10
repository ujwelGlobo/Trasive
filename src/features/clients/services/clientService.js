import axiosInstance from "@/core/api/axiosInstance";

/* GET CLIENTS */
export const getClients = async (userId) => {
  const res = await axiosInstance.get(`/clients/${userId}`);
  return res.data?.data || [];
};