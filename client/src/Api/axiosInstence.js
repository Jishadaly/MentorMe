import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from "sonner";



const baseUrl = import.meta.env.VITE_API_BASE_URL

export const authInstanceAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
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
  
                const accessToken = response.data.accessToken
                Cookies.set('token', accessToken);
              
                authInstanceAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return authInstanceAxios(originalRequest);

              } catch (refreshError) {
                
                toast.error('Session expired. Please log in again.');
                navigate('/mentee/login');
              }
            }
            
            if (message === 'Access denied: User is blocked') {
              toast.error('Your account has been blocked. Please contact support team.');

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