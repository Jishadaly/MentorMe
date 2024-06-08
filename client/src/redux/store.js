// src/store.js
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth/authSlice';
import authReducer from '@/redux/userAuthSlice'
import adminAuthReducer from '@/redux/adminAuthSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth:adminAuthReducer
  },
});

export default store;