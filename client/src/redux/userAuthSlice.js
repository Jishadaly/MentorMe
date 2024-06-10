// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authInstanceAxios } from '@/Api/services/auth/user-auth-service';



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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(mentorLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mentorLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(mentorLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
