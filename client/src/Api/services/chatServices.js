import { authInstanceAxios } from "../axiosInstence";


export const  startChat = async(endPoint  , mentorId , menteeId )=>{
      const response = await authInstanceAxios.get(`/${endPoint}?mentorId=${mentorId}&menteeId=${menteeId}`);
      return response.data;
  };

  export const sendMessge = async (endPoint,formData,config)=>{
      const response =await authInstanceAxios.post(`/${endPoint}` , formData,config);
      return response.data;
  };

  export const  getChats = async (endPoint )=>{
    const response =await authInstanceAxios.get(`/${endPoint}`);
    return response.data;
  };

  export const getMessages = async (endPoint , chatId)=>{
      const response = await authInstanceAxios.get(`/${endPoint}?chatId=${chatId}`);
      return response.data;
  }