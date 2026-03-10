import axiosInstance from "@/core/api/axiosInstance";

/* SERVICE TYPES */

export const getServiceTypes = async (userId) => {
  const res = await axiosInstance.get(`/servicetypes/${userId}`);
  return res.data?.data || [];
};

/* MEAL PLANS */

export const getMealPlans = async (userId) => {
  const res = await axiosInstance.get(`/mealPlans/${userId}`);
  return res.data?.data || [];
};

/* LEAD SOURCES */

export const getLeadSources = async (userId) => {
  const res = await axiosInstance.get(`/lead-sources/${userId}`);
  return res.data?.data || [];
};
export const getQueryPriorities = async () => {
  const res = await axiosInstance.get(`/query/priority`);
  return res.data?.data || [];
};

/* CREATE QUERY */

export const createQuery = async (userId, payload) => {
  const res = await axiosInstance.post(`/query/add/${userId}`, payload);
  return res.data;
};
