// import { authInstanceAxios } from "../axiosInstence";
import { authInstanceAxios } from "./adminAxios";

export const getApplicationMentores = async (endPoint) => {
  const response = await authInstanceAxios.get(`/${endPoint}`)
  return response.data;
}

export const verifyApplication = async (endPoint, userData) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, { userData })
  return response;
}

export const rejectApplication = async (endPoint, userData) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, { userData })
  return response;
}

export const fetchAllUsers = async (endPoint) => {
  const response = await authInstanceAxios.get(`/${endPoint}`);
  return response
}

export const fetchAllMentors = async (endPoint) => {
  const response = await authInstanceAxios.get(`/${endPoint}`);
  return response
}

export const updateBlockStatus = async (endPoint, id, isBlocked,) => {
  const response = await authInstanceAxios.patch(`/${endPoint}?userId=${id}&isBlocked=${isBlocked}`);
  return response
}

export const fetchSlotes = async (endPoint) => {
  const response = await authInstanceAxios.get(`/${endPoint}`);
  return response.data;
}

export const getChartData = async (endPoint) => {
  const response = await authInstanceAxios.get(`/${endPoint}`);
  return response.data;
} 

export const fetchAllReports = async(endPoint)=>{
  const response  = await authInstanceAxios.get(`/${endPoint}`);
  return response.data
}

export const updateBlogStatus = async (endPoint, id, isBlocked,) => {
  const response = await authInstanceAxios.patch(`/${endPoint}?blogId=${id}&isBlocked=${isBlocked}`);
  return response
}

export const getBlogsStatus = async(endPoint)=>{
  const response  = await authInstanceAxios.get(`/${endPoint}`);
  return response.data
}

export const getMentorDashboardData = async(endPoint)=>{
  const response  = await authInstanceAxios.get(`/${endPoint}`);
  return response.data
}