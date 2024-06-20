import { authInstanceAxios } from "../axiosInstence";

export const  getMentors = async(endPoint )=>{
  console.log(endPoint);
  try {
    const response = await authInstanceAxios.get(`/${endPoint}`);
      return response;
  } catch (error) {
    console.log(error);
  }
}

export const addSlots = async(endPoint , slots)=>{
  console.log(endPoint, " '''''' ", slots);
  try {
    const response  = await authInstanceAxios.post(`/${endPoint}`,slots);
    return response;
  } catch (error) {
    console.log(error);
  }
}