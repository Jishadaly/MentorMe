// src/store.js
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth/authSlice';
import authReducer from '@/redux/userAuthSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;