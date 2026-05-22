import axiosInstance from "@/core/api/axiosInstance";

// GET /api/currency/list
export const getCurrencies = async () => {
  const response = await axiosInstance.get("/currency/list");
  return response.data;
};

// GET /api/currency/show/:id
export const getCurrencyById = async (id) => {
  const response = await axiosInstance.get(`/currency/show/${id}`);
  return response.data;
};

// POST /api/currency/store/:userId
export const createCurrency = async (userId, payload) => {
  const response = await axiosInstance.post(`/currency/store/${userId}`, payload);
  return response.data;
};

// PUT /api/currency/update/:id
export const updateCurrency = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/currency/update/${id}`, payload);
    return response.data;
  } catch (err) {
    if (err.response?.status === 422) {
      console.error("Validation errors →", JSON.stringify(err.response.data, null, 2));
    }
    throw err;
  }
};

// DELETE /api/currency/delete/:id
export const deleteCurrency = async (id) => {
  try {
    const response = await axiosInstance.delete(`/currency/delete/${id}`);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      const fallbackResponse = await axiosInstance.delete(`/currency/${id}`);
      return fallbackResponse.data;
    }
    throw err;
  }
};

export const getCountries = async () => {
  const response = await axiosInstance.get("/country");
  return response.data;
};