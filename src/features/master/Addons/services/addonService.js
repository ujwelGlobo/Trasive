import axiosInstance from "@/core/api/axiosInstance";

// GET /api/addons/list
export const getAddons = async () => {
  const response = await axiosInstance.get("/addons/list");
  return response.data;
};

// GET /api/addons/show/:id
export const getAddonById = async (id) => {
  const response = await axiosInstance.get(`/addons/show/${id}`);
  return response.data;
};

// POST /api/addons/store/:adminId
export const createAddon = async (adminId, payload) => {
  const response = await axiosInstance.post(`/addons/store/${adminId}`, payload);
  return response.data;
};

// PUT /api/addons/update/:id
export const updateAddon = async (id, payload) => {
  const response = await axiosInstance.put(`/addons/update/${id}`, payload);
  return response.data;
};

// DELETE /api/addons/delete/:id
export const deleteAddon = async (id) => {
  const response = await axiosInstance.delete(`/addons/delete/${id}`);
  return response.data;
};