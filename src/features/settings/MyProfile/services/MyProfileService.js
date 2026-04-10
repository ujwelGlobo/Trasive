import axiosInstance from "@/core/api/axiosInstance";


export const getProfile = async (user_id) => {
  const response = await axiosInstance.get(`/users/${user_id}`);
  return response.data.data;
};

export const updateProfile = (user_id, formData) => {
  return axiosInstance.post(`/updateprofile/${user_id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateSignature = (id, data) => {
  return axiosInstance.put(`/signature/${id}`, data);
};

export const getSignature = async (userId) => {
  const res = await axiosInstance.get(`/getsignature`, {
    params: { id: userId },  // userId must be a plain number e.g. 28
  });
  return res.data.data;
};

export const uploadSignatureImage = async (id, file) => {
  const formData = new FormData();
  formData.append("signature_image", file);
  formData.append("id", id);

  const res = await axiosInstance.post(`/signature/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; // contains image_url
};