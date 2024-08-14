import axios from "axios";
import { CONFIG_KEYS } from "@/config";
import Cookies from 'js-cookie';
import { toast } from "sonner";



const baseUrl = CONFIG_KEYS.API_BASE_URI

export const authInstanceAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

authInstanceAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('adminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);