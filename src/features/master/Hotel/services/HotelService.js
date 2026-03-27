import axiosInstance from "@/core/api/axiosInstance";

/* ── helper: build FormData from a plain object ── */
const toFormData = (payload) => {
  const fd = new FormData();
  Object.keys(payload).forEach((key) => {
    const val = payload[key];
    if (val !== null && val !== undefined && val !== "") {
      fd.append(key, val);
    }
  });
  return fd;
};

/* ── GET HOTELS ── */
export const getHotels = async (userId) => {
  const response = await axiosInstance.get(`/list/${userId}`);
  return response.data;
};

/* ── CREATE HOTEL ── */
export const createHotel = async (userId, payload) => {
  const response = await axiosInstance.post(
    `/addhotel/${userId}`,
    toFormData(payload),
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

/* ── UPDATE HOTEL ──
   Laravel does NOT support file uploads via PUT.
   We POST with _method=PUT (Laravel method spoofing). */
export const updateHotel = async (id, payload) => {
  const fd = toFormData(payload);
  fd.append("_method", "PUT");
  const response = await axiosInstance.post(`/hotel/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/* ── DELETE HOTEL ── */
export const deleteHotel = async (id) => {
  const response = await axiosInstance.delete(`/hotel/${id}`);
  return response.data;
};

/* ── HOTEL CATEGORIES ── */
export const getCategories = async (userId) => {
  try {
    const response = await axiosInstance.get(`/categorylist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get categories error:", error);
    throw error;
  }
};