import axiosInstance from "@/core/api/axiosInstance";

/* SERVICE TYPES */
export const getServiceTypes = async (userId) => {
  const res = await axiosInstance.get(`/servicetypes`);
  return res.data?.data || [];
};

/* MEAL PLANS */
export const getMealPlans = async (userId) => {
  const res = await axiosInstance.get(`/mealPlans/${userId}`);
  return res.data?.data || [];
};

/* ASSIGN TO */
export const getassignTo = async (userId) => {
  const res = await axiosInstance.get(`/assign/${userId}`);
  return res.data?.data || [];
};

/* UPDATE ASSIGN TO */
export const updateAssignTo = async (userId, queryId, assignTo) => {
  const res = await axiosInstance.put(`/query/update/${userId}/${queryId}`, {
    assignTo: Number(assignTo),
  });
  return res.data;
};

/* CREATE QUERY */
export const createQuery = async (userId, payload) => {
  const res = await axiosInstance.post(`/query/add/${userId}`, payload);
  return res.data;
};

/* UPDATE QUERY */
export const updateQuery = async (userId, queryId, payload) => {
  const res = await axiosInstance.put(`/query/${userId}/${queryId}`, payload);
  return res.data;
};

/* PHONE SEARCH */
export const searchByPhone = async (phone) => {
  const res = await axiosInstance.get(`/query/phonesearch?phone=${phone}`);
  return res.data?.data || null;
};

export const getQueryById = async (id) => {
  const res = await axiosInstance.get(`/query/show/${id}`);
  return res.data;
};