import axiosInstance from "@/core/api/axiosInstance";

/**
 * Get all countries
 */
export const getCountries = async () => {
  const response = await axiosInstance.get("/country");
  return response.data;
};


export const createCountry = async (userId, payload) => {
  const response = await axiosInstance.post(`/country/${userId}`, payload);
  return response.data;
};


export const updateCountry = async (id, userId, payload) => {
  const response = await axiosInstance.put(
    `/country/${id}/${userId}`,
    payload
  );
  return response.data;
};


export const deleteCountry = async (id) => {
  const response = await axiosInstance.delete(`/country/${id}`);
  return response.data;
};