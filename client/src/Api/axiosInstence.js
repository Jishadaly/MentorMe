
import axios from "axios";
import {CONFIG_KEYS} from '../../../config.js' 




export const authInstanceAxios = axios.create({
  baseURL: CONFIG_KEYS.API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true,
});