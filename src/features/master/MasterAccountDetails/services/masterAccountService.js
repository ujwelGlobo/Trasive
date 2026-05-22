// services/accountDetailsService.js

import axiosInstance from "@/core/api/axiosInstance";

/* GET ACCOUNT DETAILS */

export const getAccountDetails = async (
  userId
) => {
  const response =
    await axiosInstance.get(
      `/accountdetails/${userId}`
    );

  return response.data;
};

/* SAVE ACCOUNT DETAILS */

export const saveAccountDetails =
  async (userId, payload) => {
    const response =
      await axiosInstance.post(
        `/accountdetails/${userId}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    return response.data;
  };