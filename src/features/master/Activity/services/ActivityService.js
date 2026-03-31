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

export const updateActivity = async (id, payload) => {
  const response = await axiosInstance.post(
    `/activity/update/${id}`,       // POST with ?_method=PUT for Laravel
    (() => { payload.append("_method", "PUT"); return payload; })(),
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


// ✅ Get Rate List
export const getActivityRateList = async (activityId) => {
  const response = await axiosInstance.get(`/activity/ratelist/${activityId}`);
  return response.data;
};

// ✅ Add Rate
export const addActivityRate = async (userId, payload) => {
  const response = await axiosInstance.post(
    `/activity/rateadd/${userId}`,
    payload
  );
  return response.data;
};

// ✅ Update Rate
export const updateActivityRate = async (id, payload) => {
  payload.append("_method", "PUT");  // just append directly before the call
  const response = await axiosInstance.post(
    `/activity/update/${id}`,
    payload,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

// Replace or add alongside existing getSuppliers
export const getActivitySuppliers = async () => {
  const response = await axiosInstance.get(`/activity/supplierlist`);
  return response.data;
};