import axiosInstance from "@/core/api/axiosInstance";

export const getSuppliers = async (userId) => {
  const response = await axiosInstance.get(`/suppliers/${userId}`);
  return response.data;
};

export const createSupplier = async (userId, payload) => {
  const response = await axiosInstance.post(`/suppliers/${userId}`, payload);
  return response.data;
};

export const updateSupplier = async (id, payload) => {
  const response = await axiosInstance.put(`/suppliers/${id}`, payload);
  return response.data;
};

export const getServiceTypes = async (userId) => {
  const response = await axiosInstance.get(`/servicetypes/${userId}`);
  return response.data;
};