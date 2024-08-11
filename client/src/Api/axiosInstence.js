import axios from "axios";
import { CONFIG_KEYS } from "@/config";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slice/userAuthSlice";
import { toast } from "sonner";

const baseUrl = CONFIG_KEYS.API_BASE_URI

export const authInstanceAxios = axios.create({
  baseURL: CONFIG_KEYS.API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

authInstanceAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    console.log(!token ? "notoken" : 'token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupInterceptors = (navigate, dispatch) => {
  authInstanceAxios.interceptors.response.use(
    (response) => {
      console.log({ response });
      return response;
    },
    async (error) => {
      console.log({ error });
      const originalRequest = error.config;
      if (error.response) {
        console.log({ error });
        const status = error.response.status;
        const message = error.response.data.message || error.message;

        switch (status) {
          case 403:
            if (message === "token expired" && !originalRequest._retry) {
              console.log("token expired ");
              originalRequest._retry = true;

              try {
                const response = await axios.post(`${baseUrl}/user/refreshToken`, {}, { withCredentials: true });
                console.log("response", response);

                const accessToken = response.data.accessToken
                Cookies.set('token', accessToken);
                console.log("new access token added token added ", accessToken);

                authInstanceAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return authInstanceAxios(originalRequest);

              } catch (refreshError) {
                
                toast.error('Session expired. Please log in again.');
                navigate('/mentee/login');
              }
            }
            
            if (message === 'Access denied: User is blocked') {
              toast.error('Your account has been blocked. Please contact support.');

              setTimeout(() => {
                Cookies.remove('token');
                window.location.href = '/mentee/login';
              }, 3000);
            }

            break;
          case 401:
            console.error("Access denied - you don't have permission to access this resource");
            break;

          case 404:
            console.error("Resource not found", message);
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

setupInterceptors();