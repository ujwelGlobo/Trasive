import axiosInstance from "@/core/api/axiosInstance";

// GET /api/vehiclecategory/list/:adminId
export const getVehicleCategories = async (
  workspaceId
) => {
  const response = await axiosInstance.get(
    `/vehiclecategory/listworkspace/${workspaceId}`
  );

  return response.data;
};

// GET /api/vehiclecategory/show/:id
export const getVehicleCategoryById = async (id) => {
  const response = await axiosInstance.get(`/vehiclecategory/show/${id}`);
  return response.data;
};

// POST /api/vehiclecategory/add/:adminId
export const createVehicleCategory = async (adminId, payload) => {
  const response = await axiosInstance.post(`/vehiclecategory/add/${adminId}`, payload);
  return response.data;
};

// PUT /api/vehiclecategory/update/:id/:adminId
export const updateVehicleCategory = async (id, adminId, payload) => {
  const response = await axiosInstance.put(`/vehiclecategory/update/${id}/${adminId}`, payload);
  return response.data;
};

// DELETE /api/vehiclecategory/delete/:id
export const deleteVehicleCategory = async (id) => {
  const response = await axiosInstance.delete(`/vehiclecategory/delete/${id}`);
  return response.data;
};