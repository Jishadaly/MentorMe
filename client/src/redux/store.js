// src/store.js
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth/authSlice';
import authReducer from '@/redux/slice/userAuthSlice'
import adminAuthReducer from '@/redux/slice/adminAuthSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth:adminAuthReducer
  },
});

export default store;