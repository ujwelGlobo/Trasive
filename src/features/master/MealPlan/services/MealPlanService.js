import axiosInstance from "@/core/api/axiosInstance";

/* GET MEAL PLANS */

export const getMealPlans = async (userId) => {
  const response = await axiosInstance.get(`/mealPlans/${userId}`);
  return response.data;
};

/* CREATE MEAL PLAN */

export const createMealPlan = async (payload) => {
  const response = await axiosInstance.post(`/mealPlans`, payload);
  return response.data;
};

/* UPDATE MEAL PLAN */

export const updateMealPlan = async (id, payload) => {
  const response = await axiosInstance.put(`/mealPlans/${id}`, payload);
  return response.data;
};