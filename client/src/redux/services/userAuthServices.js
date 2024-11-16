import { authInstanceAxios } from '@/Api/axiosInstence';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk(
  'auth/userLogin',
  async ({ endpoint, userData }, thunkAPI) => {
    try {
      console.log(endpoint, userData);
      const response = await authInstanceAxios.post(`/${endpoint}`, userData);
      console.log(response);
      const user = response.data.response.user;
      const token = response.data.response.accessToken;
      console.log(token);


      Cookies.set('token', token)

      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const mentorLogin = createAsyncThunk(
  'auth/mentorLogin',
  async ({ endpoint, mentorData }, thunkAPI) => {

    try {

      const response = await authInstanceAxios.post(`/${endpoint}`, mentorData);
      const user = response.data.response.user;
      const token = response.data.response.accessToken;

      Cookies.set('token', token);

      

      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async ({ endpoint, userData }, thunkAPI) => {

    try {
      const response = await authInstanceAxios.post(`/${endpoint}`, userData);
      const user = response.data.response.user;
      const token = response.data.response.token;
      console.log('google auth response : ',response);
      console.log('google auth token : ',token);

      Cookies.set('token', token)

      return { user, token };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const sendForgotLink = async (endPoint, email) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, email);
  return response.data
}

export const resetPassword = async (endPoint, data) => {
  const response = await authInstanceAxios.post(`/${endPoint}`, data);
  return response.data;
}