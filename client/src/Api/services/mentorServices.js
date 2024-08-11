import { authInstanceAxios } from "../axiosInstence";

export const getMentors = async (endPoint) => {
  const response = await authInstanceAxios.get(`/${endPoint}`);
  return response;
}

export const addSlots = async (endPoint, slots) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, slots);
  return response.data;
}

export const deleteSlot = async (endPoint, slotId) => {
  const response = await authInstanceAxios.delete(`/${endPoint}?slotId=${slotId}`);
  return response.data;
}

export const getMentorApplication = async (endPoint, mentorId) => {
  const response = await authInstanceAxios.get(`/${endPoint}?mentorId=${mentorId}`);
  return response;
}

export const getMentorAvalableSlots = async (endPoint) => {

  const response = await authInstanceAxios.get(`${endPoint}`);
  return response;
}

export const getMentorData = async (endPoint, userId) => {
  const response = await authInstanceAxios.get(`/${endPoint}?userId=${userId}`);
  return response.data;
}

export const updateMentorProfile = async (endPoint, datas) => {
  const response = await authInstanceAxios.put(`/${endPoint}`, datas);
  return response.data;
}

export const getSessions = async (endPoint) => {
  const response = await authInstanceAxios.get(`/${endPoint}`);
  return response.data;
}

export const getNotifications = async (endPoint) => {
  const response = await authInstanceAxios.get(`/${endPoint}`);
  return response.data;
}

export const markRead = async (endPoint, notifyId) => {
  const response = await authInstanceAxios.patch(`/${endPoint}?notificationId=${notifyId}`);
  return response.data._id
}

export const updateSessionStatus = async (endPoint, status , sessionId) => {
  const response = await authInstanceAxios.patch(`/${endPoint}?id=${sessionId}&status=${status}`);
  return response.data;
}