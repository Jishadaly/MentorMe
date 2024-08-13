import { authInstanceAxios } from "../axiosInstence";
import axios from 'axios';

export const fetchMentorData = async (endPoint, mentorId) => {
  const response = await authInstanceAxios.get(`${endPoint}?mentorId=${mentorId}`);
  return response;
}

export const slotBookingbyMentee = async (endPoint, datas) => {
   const response =  await authInstanceAxios.post(`${endPoint}`, datas);
  return response;
}

export const createCheckoutSession = async (endPoint, datas) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, datas);
  return response.data
}

export const fetchBookedSlotes = async (endPoint, datas) => {
  const response = await authInstanceAxios.get(`/${endPoint}?userId=${datas}`);
  return response.data
}

export const getMentee = async (endPoint, datas) => {
  const response = await authInstanceAxios.get(`/${endPoint}`);
  return response.data
}

export const updateName = async (endPoint, datas) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, datas);
  return response.data
}

export const addPost = async (endPoint, datas, config) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, datas, config);
  return response.data
}

export const getBlogs = async (endPoint, page) => {
  const response = await authInstanceAxios.get(`/${endPoint}?page=${page}`);
  return response.data
}

export const getMentorBlogs = async (endPoint, mentorId) => {
  const response = await authInstanceAxios.get(`/${endPoint}`);
  return response.data
}

export const fetchBlog = async (endPoint, blogId) => {
  const response = await authInstanceAxios.get(`/${endPoint}?blogId=${blogId}`);
  return response.data
}

export const updatePost = async (endPoint, datas, config) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, datas, config);
  return response.data
}

export const deleteBlog = async (endPoint, blogId) => {
  const response = await authInstanceAxios.delete(`/${endPoint}?blogId=${blogId}`);
  return response.data
}

export const uploadProfilePicture = async (endPoint, formData, config) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, formData, config);
  return response.data;
};

export const postFeedback = async (endPoint, content) => {
  
  const response = await authInstanceAxios.post(`/${endPoint}`, content);
  return response.data;
};

export const getMentorReviwes = async (endPoint, mentorId) => {
  const response = await authInstanceAxios.get(`/${endPoint}?mentorId=${mentorId}`);
  return response.data
};

export const reportBlog = async (endPoint, data) => {
  const response = await authInstanceAxios.post(`/${endPoint}` , data);
  return response.data
};