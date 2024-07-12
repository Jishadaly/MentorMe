
import axios from "axios";
import { CONFIG_KEYS } from "@/config";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slice/userAuthSlice";

const baseUrl = CONFIG_KEYS.API_BASE_URI


export const authInstanceAxios = axios.create({
  baseURL: CONFIG_KEYS.API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true,
})


authInstanceAxios.interceptors.request.use(
  (config) => {
   
    const token = Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupInterceptors = () => {


  authInstanceAxios.interceptors.response.use(
    (response) => {
      // Handle successful responses (status code 2xx)
      return response;
    },
    async (error) => {
      // Handle errors
      const originalRequest = error.config;
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message || error.message;

        switch (status) {
          case 401:
           
            if (message === "token expired" && !originalRequest._retry ) {
              console.log("token expired ");
              originalRequest._retry = true;

              try {
                      const response = await axios.post(`${baseUrl}/user/refreshToken`, {}, { withCredentials: true });
                      console.log("axios respoon dtatatata",);

                      const accessToken = response.data.accessToken
                      Cookies.set('token',accessToken);
                      console.log("refresh token added ");

                      authInstanceAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
                      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                      return authInstanceAxios(originalRequest);

              } catch (refreshError) {

                      // dispatch(logout());
                      // toast.error('Session expired. Please log in again.');
                      // navigate('/mentee/login');
              }
            }
           
            Cookies.remove('token');
            window.location.href = '/';

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
};