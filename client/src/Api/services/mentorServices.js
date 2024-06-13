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