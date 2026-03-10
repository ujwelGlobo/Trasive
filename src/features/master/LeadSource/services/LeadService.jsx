import axiosInstance from "@/core/api/axiosInstance";

export const getLeadSource = async (userId) => {
  const response = await axiosInstance.get(`/lead/${userId}`);
  return response.data;
};

export const createdLeadSource=async(payload)=>{
    const response = await axiosInstance.post(`/lead/`,payload)
    return response.data
}

export const UpdatedLeadSource=async(id,payload)=>{
    const response = await axiosInstance.put(`/lead/${id}`,payload)
    return response.data
}