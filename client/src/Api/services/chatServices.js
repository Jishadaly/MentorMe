import { authInstanceAxios } from "../axiosInstence";


export const  startChat = async(endPoint  , mentorId , menteeId )=>{
    console.log(endPoint);
    try {
      const response = await authInstanceAxios.get(`/${endPoint}?mentorId=${mentorId}&menteeId=${menteeId}`);
        return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const sendMessge = async (endPoint , chatId , message)=>{
      try {
      console.log(chatId , message);
      const response =await authInstanceAxios.post(`/${endPoint}` , {chatId , message});
      return response.data;
      } catch (error) {
        console.log(error);
      }
  };

  export const  getChats = async (endPoint )=>{
    try {
    const response =await authInstanceAxios.get(`/${endPoint}`);
    return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const getMessages = async (endPoint , chatId)=>{
    try {
      const response = await authInstanceAxios.get(`/${endPoint}?chatId=${chatId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }