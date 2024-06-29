// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slice/userAuthSlice'
import adminAuthReducer from '@/redux/slice/adminAuthSlice'
import { persistStore , persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '.';

const persistConfg = {
  key : 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfg ,rootReducer )

const store = configureStore({
  reducer:persistedReducer
});

const persister = persistStore(store)

export  {
   store , persister
}