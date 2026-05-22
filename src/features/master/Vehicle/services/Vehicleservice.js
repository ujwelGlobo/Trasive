import axiosInstance from "@/core/api/axiosInstance";

// GET /api/vehicle/listworkspace/:adminId
export const getVehicles = async (adminId) => {
  const response = await axiosInstance.get(`/vehicle/listworkspace/${adminId}`);
  return response.data;
};

// GET /api/vehicle/show/:id
export const getVehicleById = async (id) => {
  const response = await axiosInstance.get(`/vehicle/show/${id}`);
  return response.data;
};

// POST /api/vehicle/add/:adminId
export const createVehicle = async (adminId, payload) => {
  const response = await axiosInstance.post(`/vehicle/add/${adminId}`, payload);
  return response.data;
};

// PUT /api/vehicle/update/:id/:adminId
export const updateVehicle = async (id, adminId, payload) => {
  const response = await axiosInstance.put(`/vehicle/update/${id}/${adminId}`, payload);
  return response.data;
};

// DELETE /api/vehicle/delete/:id
export const deleteVehicle = async (id) => {
  const response = await axiosInstance.delete(`/vehicle/delete/${id}`);
  return response.data;
};