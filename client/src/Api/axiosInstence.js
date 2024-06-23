
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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const message = error.response.data.message || error.message;
      
      // Customize error handling based on status code
      switch (status) {
        case 401:
          // Unauthorized - Handle token expiration or redirection to login
          console.error("Unauthorized access - redirecting to login");
          localStorage.removeItem('token');
          window.location.href = '/login'; // Redirect to login page
          break;
        case 403:
          // Forbidden - Handle access denied
          console.error("Access denied - you don't have permission to access this resource");
          break;
        case 404:
          // Not Found - Handle resource not found
        console.error("Resource not found");
          break;
        default:
          // Handle other errors
          console.error(`Error: ${message}`);
          
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);