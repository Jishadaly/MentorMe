import { authInstanceAxios } from '@/Api/axiosInstence';
import {  createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk(
  'auth/userLogin',
  async ({ endpoint, userData }, thunkAPI) => {
    try {
      console.log(endpoint, userData);
      const response = await authInstanceAxios.post(`/${endpoint}`, userData);
      const user = response.data.response.user;
      const token = response.data.response.token;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      Cookies.set('userToken',token)

      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const mentorLogin = createAsyncThunk(
  'auth/mentorLogin',
  async ({ endpoint, mentorData }, thunkAPI) => {
    console.log(endpoint , mentorData);
    try {
     
      const response = await authInstanceAxios.post(`/${endpoint}`, mentorData);
      console.log("responsddsds",response);
      const user = response.data.response.user;
      const token = response.data.response.token;

      // Save to localStorage
      localStorage.setItem('mentor', JSON.stringify(user));
      Cookies.set('mentorToken',token)
      console.log("mentor",response);

      return { user, token };

      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async({endpoint , userData} , thunkAPI)=> {

    try {
       const response = await authInstanceAxios.post(`/${endpoint}`, userData);

       const user = response.data.response.user;
       const token = response.data.response.token;

      // Save to localStorage
      localStorage.setItem('token', JSON.stringify(user));
      Cookies.set('userToken',token)

      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }

)