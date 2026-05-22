import axiosInstance from "@/core/api/axiosInstance";

// GET /api/pickupdrop/list
export const getPickupDrops = async () => {
  const response = await axiosInstance.get("/pickupdrop/list");
  return response.data;
};

// GET /api/pickupdrop/show/:id
export const getPickupDropById = async (id) => {
  const response = await axiosInstance.get(`/pickupdrop/show/${id}`);
  return response.data;
};

// POST /api/pickupdrop/store/:adminId
export const createPickupDrop = async (adminId, payload) => {
  const response = await axiosInstance.post(`/pickupdrop/store/${adminId}`, payload);
  return response.data;
};

// PUT /api/pickupdrop/update/:id
export const updatePickupDrop = async (id, payload) => {
  const response = await axiosInstance.post(`/pickupdrop/update/${id}`, payload);
  return response.data;
};

// DELETE /api/pickupdrop/delete/:id
export const deletePickupDrop = async (id) => {
  const response = await axiosInstance.delete(`/pickupdrop/delete/${id}`);
  return response.data;
};