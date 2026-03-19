import axiosInstance from "@/core/api/axiosInstance";

/* GET HOTELS */

export const getHotels = async (userId) => {
  const response = await axiosInstance.get(`/list/${userId}`);
  return response.data;
};

/* CREATE HOTEL */

export const createHotel = async (userId, payload) => {
  const response = await axiosInstance.post(`/addhotel/${userId}`, payload);
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