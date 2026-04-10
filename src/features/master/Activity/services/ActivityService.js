import axiosInstance from "@/core/api/axiosInstance";

export const getActivities = async (userId) => {
  const response = await axiosInstance.get(`/activity/list/${userId}`);
  return response.data;
};

export const createActivity = async (userId, payload) => {
  const response = await axiosInstance.post(
    `/activity/create/${userId}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateActivity = async (userId, id, payload) => {
  const response = await axiosInstance.post(
    `/activity/update/${userId}/${id}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteActivity = async (id) => {
  const response = await axiosInstance.delete(`/activity/delete/${id}`);
  return response.data;
};

export const getActivityRateList = async (activityId) => {
  const response = await axiosInstance.get(`/activity/ratelist/${activityId}`);
  return response.data;
};

export const addActivityRate = async (userId, payload) => {
  const response = await axiosInstance.post(
    `/activity/rateadd/${userId}`,
    payload
  );
  return response.data;
};

export const updateActivityRate = async (rateId, activityId, payload) => {
  const response = await axiosInstance.put(
    `/activity/rateupdate/${rateId}/${activityId}`,
    payload
  );
  return response.data;
};

export const getActivitySuppliers = async () => {
  const response = await axiosInstance.get(`/activity/supplierlist`);
  return response.data;
};