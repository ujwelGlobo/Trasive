import axiosInstance from "@/core/api/axiosInstance";

export const getDashboardCounts = async (userId) => {
  try {
    const response = await axiosInstance.get(`/all-counts`, {
      params: { user_id: userId }, // important
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || "Failed to fetch dashboard counts";
  }
};