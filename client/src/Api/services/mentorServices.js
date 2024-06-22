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
  console.log("jijijijiji",slots);
 
  try {
    const response  = await authInstanceAxios.post(`/${endPoint}`,slots);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}