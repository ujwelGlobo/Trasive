import axiosInstance from "@/core/api/axiosInstance";

/* GET CLIENTS */
export const getClients = async (userId) => {
  const res = await axiosInstance.get(`/clients/${userId}`);
  return res.data?.data || [];
};

export const createClient = async (userId, payload) => {
  const res = await axiosInstance.post(`/clients/${userId}`, payload, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const updateClient = async (userId, clientId, payload) => {
  const res = await axiosInstance.put(`/clients/${userId}/${clientId}`, payload);
  return res.data;
};

export const getClientById = async (userId, clientId) => {
  const res = await axiosInstance.get(`/clientshow/${userId}/${clientId}`);
  return res.data;
};

/* GET FOLLOWUPS */
export const getFollowupsByClient = async (clientId) => {
  const res = await axiosInstance.get(`/followups/${clientId}`);
  return res.data?.data || [];
};

export const getQueriesByClient = async (clientId) => {
  const res = await axiosInstance.get(`/clientqueries/${clientId}`);
  return res.data?.data || [];
};