import axiosInstance from "@/core/api/axiosInstance";

/**
 * Get all states
 */

export const getStates = async () => {
  const response = await axiosInstance.get("/state");
  return response.data;
};

/**
 * Create state
 * @param {number} userId
 * @param {object} payload
 */

export const createState = async (userId, payload) => {
  const response = await axiosInstance.post(`/state/${userId}`, payload);
  return response.data;
};

/**
 * Update state
 * @param {number} id
 * @param {number} userId
 * @param {object} payload
 */

export const updateState = async (id, userId, payload) => {
  const response = await axiosInstance.put(
    `/state/${id}/${userId}`,
    payload
  );
  return response.data;
};

/**
 * Delete state
 * @param {number} id
 */

export const deleteState = async (id) => {
  const response = await axiosInstance.delete(`/state/${id}`);
  return response.data;
};