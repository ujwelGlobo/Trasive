import axiosInstance from "@/core/api/axiosInstance";

/* GET ITINERARIES */
export const getItineraries = async (userId) => {
  const response = await axiosInstance.get(`/itinerary/list`, {
    params: { user_id: userId },
  });
  return response.data;
};

/* CREATE */
export const createItinerary = async (userId, payload) => {
  const response = await axiosInstance.post(
    `/itinerary/store/${userId}`,
    payload
  );
  return response.data;
};

/* UPDATE */
export const updateItinerary = async (id, payload) => {
  const res = await axiosInstance.put(  
    `/itinerary/update/${id}`,
    payload
  );
  return res.data;
};

export const deleteItinerary = async (id) => {
  const res = await axiosInstance.delete(   // ✅ CORRECT
    `/itinerary/delete/${id}`
  );
  return res.data;
};