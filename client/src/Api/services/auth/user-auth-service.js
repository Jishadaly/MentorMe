import { authInstanceAxios } from "@/Api/axiosInstence";

export const userRegister = async (endPoint, userData) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, userData);
  return response;
};

export const verifyOTP = async (endPoint, data) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, data);
  return response
};

export const mentorApplicationFormApi = async (endPoint, data) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, data);
  return response
};

export const resendOtp = async (endPoint, email) => {
  const response = await authInstanceAxios.get(`${endPoint}?email=${email}`,);
  return response
}