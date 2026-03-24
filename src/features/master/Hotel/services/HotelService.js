import axiosInstance from "@/core/api/axiosInstance";

/* GET HOTELS */

export const getHotels = async (userId) => {
  const response = await axiosInstance.get(`/list/${userId}`);
  return response.data;
};

/* CREATE HOTEL */

export const createHotel = async (userId, payload) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== null && payload[key] !== undefined && payload[key] !== "") {
      formData.append(key, payload[key]);
    }
  });
  const response = await axiosInstance.post(`/addhotel/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/* UPDATE HOTEL */

export const updateHotel = async (id, payload) => {
  const response = await axiosInstance.put(`/hotel/${id}`, payload);
  return response.data;
};

/* DELETE HOTEL */

export const deleteHotel = async (id) => {
  const response = await axiosInstance.delete(`/hotel/${id}`);
  return response.data;
};

/* HOTEL category */

export const getCategories = async (userId) => {
  try {
    const response = await axiosInstance.get(`/categorylist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get categories error:", error);
    throw error;
  }
};