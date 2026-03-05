import axiosInstance from "@/core/api/axiosInstance";

export const getTeamMembers = async (adminUserId) => {
  const response = await axiosInstance.get(`/team/${adminUserId}`);
  return response.data;
};

export const createTeamMember = async (payload) => {
  const response = await axiosInstance.post("/team", payload);
  return response.data;
};