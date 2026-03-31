import axiosInstance from "@/core/api/axiosInstance";

export const getQueriesByUser = async (userId) => {
  const response = await axiosInstance.get(`/query/list/${userId}`);
  return response.data;
};

export const getStatus = async (userId) => {
  const response = await axiosInstance.get(`/query/status-counts/${userId}`);
  return response.data;
};

// ✅ (Optional) Create query
export const createQuery = async (payload) => {
  const response = await axiosInstance.post(`/query`, payload);
  return response.data;
};

// ✅ (Optional) Update query
export const updateQuery = async (userId, queryId, payload) => {
  const response = await axiosInstance.put(`/query/update/${userId}/${queryId}`, payload);
  return response.data;
};

// ✅ (Optional) Delete query
export const deleteQuery = async (id) => {
  const response = await axiosInstance.delete(`/query/${id}`);
  return response.data;
};

export const getQueryById = async (id) => {
  const res = await axiosInstance.get(`/query/show/${id}`);
  return res.data;
};
