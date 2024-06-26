
import axios from "axios";
import { CONFIG_KEYS } from "@/config";


export const authInstanceAxios = axios.create({
  baseURL: CONFIG_KEYS.API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true,
})

// Add a request interceptor to include the token
authInstanceAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Add a response interceptor
authInstanceAxios.interceptors.response.use(
  (response) => {
    // Handle successful responses (status code 2xx)
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
     
      const status = error.response.status;
      const message = error.response.data.message || error.message;
      
      switch (status) {
        case 401:
          
          console.error("Unauthorized access - redirecting to login");
          localStorage.removeItem('token');
          window.location.href = '/login'; 
          break;
        case 403:
          
          console.error("Access denied - you don't have permission to access this resource");
          break;
        case 404:
         
        console.error("Resource not found");
          break;
        default:
          
          console.error(`Error: ${message}`);
          
      }
    } else if (error.request) {
      
      console.error("No response received", error.request);
    } else {
      
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);