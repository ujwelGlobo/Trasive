import axiosInstance from "@/core/api/axiosInstance";

// GET /api/sightseeing/workspace/:adminId
export const getSightseeings = async (adminId) => {
  const response = await axiosInstance.get(`/sightseeing/workspace/${adminId}`);
  return response.data;
};

// GET /api/sightseeing/show/:id
export const getSightseeingById = async (id) => {
  const response = await axiosInstance.get(`/sightseeing/show/${id}`);
  return response.data;
};

// POST /api/sightseeing/store/:adminId/:userType
export const createSightseeing = async (adminId, userType = 4, payload) => {
  const response = await axiosInstance.post(
    `/sightseeing/store/${adminId}/${userType}`,
    payload,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

// PUT /api/sightseeing/update/:id
export const updateSightseeing = async (id, payload) => {
  const response = await axiosInstance.post(
    `/sightseeing/update/${id}`,
    payload,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

// DELETE /api/sightseeing/delete/:id
export const deleteSightseeing = async (id) => {
  const response = await axiosInstance.delete(`/sightseeing/delete/${id}`);
  return response.data;
};