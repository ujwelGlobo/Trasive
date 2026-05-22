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

