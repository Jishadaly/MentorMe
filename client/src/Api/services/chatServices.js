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

  export const sendMessge = async (endPoint,formData,config)=>{
      try {
      console.log("1111",formData);
      const response =await authInstanceAxios.post(`/${endPoint}` , formData,config);
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