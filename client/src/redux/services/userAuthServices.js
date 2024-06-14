import { authInstanceAxios } from '@/Api/axiosInstence';
import {  createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/userLogin',
  async ({ endpoint, userData }, thunkAPI) => {
    try {
      console.log(endpoint, userData);
      const response = await authInstanceAxios.post(`/${endpoint}`, userData);
      const user = response.data.user;
      const token = response.data.response.token;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

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
      const user = response.data.user;
      const token = response.data.response.token;

      // Save to localStorage
      localStorage.setItem('mentor', JSON.stringify(user));
      localStorage.setItem('Mentortoken', token);


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

       const user = response.data.user;
       const token = response.data.response.token;

      // Save to localStorage
      localStorage.setItem('token', JSON.stringify(user));
      localStorage.setItem('token', token);

      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }

)