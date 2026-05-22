import axiosInstance from "@/core/api/axiosInstance";

// GET /api/flight/list
export const getFlights = async () => {
  const response = await axiosInstance.get("/flight/list");
  return response.data;
};

// POST /api/flight/store/:adminId
export const createFlight = async (adminId, payload) => {
  const response = await axiosInstance.post(`/flight/store/${adminId}`, payload);
  return response.data;
};

// PUT /api/flight/update/:id
export const updateFlight = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/flight/update/${id}`, payload);
    return response.data;
  } catch (err) {
    if (err.response?.status === 422) {
      console.error("Validation errors →", JSON.stringify(err.response.data, null, 2));
    }
    throw err;
  }
};

// DELETE /api/flight/delete/:id
export const deleteFlight = async (id) => {
  try {
    const response = await axiosInstance.delete(`/flight/delete/${id}`);
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      // fallback if endpoint differs
      const fallback = await axiosInstance.delete(`/flight/${id}`);
      return fallback.data;
    }
    throw err;
  }
};