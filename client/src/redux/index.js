import { combineReducers } from "@reduxjs/toolkit";
import adminAuthSlice from "./slice/adminAuthSlice";
import userAuthSlice from "./slice/userAuthSlice";


const rootReducer = combineReducers({
  auth:userAuthSlice,
  adminAuth:adminAuthSlice
})

export default rootReducer;