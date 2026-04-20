import axiosInstance from "@/core/api/axiosInstance";

/* ── IMAGE URL HELPER ── */
export const getHotelImageUrl = (path) => {
  if (!path) return null;

  const baseURL = axiosInstance.defaults.baseURL?.replace("/api", "");

  return path.startsWith("http")
    ? path
    : `${baseURL}/storage/${path}`;
};

/* ── GET HOTELS ── */
export const getHotels = async (userId) => {
  const response = await axiosInstance.get(`/list/${userId}`);
  return response.data;
};

/* ── CREATE HOTEL ── */
export const createHotel = async (userId, fd) => {
  const response = await axiosInstance.post(
    `/addhotel/${userId}`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

/* ── UPDATE HOTEL ── */
export const updateHotel = async (userId, hotelId, fd) => {
  const response = await axiosInstance.post(
    `/updatehotel/${userId}/${hotelId}`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

/* ── DELETE HOTEL ── */
export const deleteHotel = async (id) => {
  const response = await axiosInstance.delete(`/hoteldelete/${id}`);
  return response.data;
};

/* ── HOTEL CATEGORIES ── */
export const getCategories = async (userId) => {
  const response = await axiosInstance.get(`/categorylist/${userId}`);
  return response.data;
};

/* ── GET HOTEL BY ID ── */
export const getHotelById = async (id) => {
  const response = await axiosInstance.get(`/showhotel/${id}`);
  return response.data;
};