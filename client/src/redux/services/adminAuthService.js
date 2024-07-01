import { authInstanceAxios } from '@/Api/axiosInstence';
import {  createAsyncThunk } from '@reduxjs/toolkit';


export const loginAdmin = createAsyncThunk(
  'adminAuth/adminLogin',
  async ({ endpoint, adminData }, thunkAPI) => {
    try {
      console.log(endpoint, adminData);
      const response = await authInstanceAxios.post(`/${endpoint}`, adminData);
      console.log(response);
      const admin = response.data.admin;
      const token = response.data.response.token;

      // Save to localStorage
      localStorage.setItem('admin', JSON.stringify(admin));
      localStorage.setItem('Admintoken', token);

      return { admin, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);