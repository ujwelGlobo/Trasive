import axiosInstance from "@/core/api/axiosInstance";

/* SERVICE TYPES */

export const getServiceTypes = async (userId) => {
  const res = await axiosInstance.get(`/servicetypes/${userId}`);
  return res.data?.data || [];
};
// export const getServiceTypes = async (userId) => {
//   const response = await axiosInstance.get(`/servicetypes/${userId}`);
//   return response.data;
// };
/* MEAL PLANS */

export const getMealPlans = async (userId) => {
  const res = await axiosInstance.get(`/mealPlans/${userId}`);
  return res.data?.data || [];
};

/* LEAD SOURCES its getting from leadsource.jsx  in its own listing page in master*/


export const getassignTo = async (userId) => {
  const res = await axiosInstance.get(`/assign/${userId}`);
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

/* Phone Number */

export const searchByPhone = async (phone) => {
  const res = await axiosInstance.get(`/query/phonesearch?phone=${phone}`);
  return res.data?.data || null;
};

export const updateQuery = (userId, queryId, payload) =>
  axiosInstance.put(`/query/${userId}/${queryId}`, payload);
