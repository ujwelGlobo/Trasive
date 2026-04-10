import axiosInstance from "@/core/api/axiosInstance";



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
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateHotel = async (id, fd) => {
  const response = await axiosInstance.post(
    `/hotel/${id}`,
    fd,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

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