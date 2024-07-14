import { authInstanceAxios } from "../axiosInstence";


export const  startChat = async(endPoint  , mentorId , menteeId )=>{
    console.log(endPoint);
    try {
      const response = await authInstanceAxios.get(`/${endPoint}?mentorId=${mentorId}&menteeId=${menteeId}`);
        return response.data;
    } catch (error) {
      console.log(error);
    }
  }

