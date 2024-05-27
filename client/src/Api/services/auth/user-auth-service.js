import axios from "axios";
import {CONFIG_KEYS} from '../../../config.js' 
import { date } from "yup";


const authInstenceAxios = axios.create({
  baseURL : CONFIG_KEYS.API_BASE_URI,
  headers :{
     'Content-Type' : 'application/json',
  } 
})

export const userRegister = async ( endPoint ,userData  ) => {
   const response = await authInstenceAxios.post(`/${endPoint}` , date);

   return response
};
