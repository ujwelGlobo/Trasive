import axiosInstance from "@/core/api/axiosInstance";

// GET /api/incindex
export const fetchInclusionExclusions = async () => {
  const response = await axiosInstance.get("/incindex");
  return response.data;
};

// GET /api/incshow/:id
export const fetchInclusionExclusionById = async (id) => {
  const response = await axiosInstance.get(`/incshow/${id}`);
  return response.data;
};

// POST /api/incstore/:adminId
export const createInclusionExclusion = async (adminId, payload) => {
  const response = await axiosInstance.post(`/incstore/${adminId}`, payload);
  return response.data;
};

// PUT /api/incupdate/:adminId/:id
export const updateInclusionExclusion = async (adminId, id, payload) => {
  const response = await axiosInstance.put(`/incupdate/${adminId}/${id}`, payload);
  return response.data;
};

// DELETE /api/incdestroy/:id
export const deleteInclusionExclusion = async (id) => {
  const response = await axiosInstance.delete(`/incdestroy/${id}`);
  return response.data;
};