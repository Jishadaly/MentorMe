// src/features/auth/adminAuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authInstanceAxios } from '@/Api/axiosInstence';

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
      localStorage.setItem('token', token);

      return { admin, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    admin: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem('admin');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
