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
 
  
    const response  = await authInstanceAxios.post(`/${endPoint}`,slots);
    return response.data;
  
}

export const deleteSlot = async(endPoint , slotId)=>{
  
    const response  = await authInstanceAxios.delete(`/${endPoint}?slotId=${slotId}`);
    return response.data;
 
}



export const getMentorApplication = async (endPoint , mentorId)=>{
  try {
    const response = await authInstanceAxios.get(`/${endPoint}`, {
      params:{
        mentorId:mentorId
      }
    });
    console.log("mentri service",response);
    return response;

  } catch (error) {
    console.log(error);
  }
}

export const getMentorAvalableSlots = async (endPoint)=>{
  try {
    const response = await authInstanceAxios.get(`${endPoint}`);
    console.log("mentri service",response);
    return response;

  } catch (error) {
    console.log(error);
  }
}  

export const getMentorData = async(endPoint , userId)=>{
  try {
    const response = await authInstanceAxios.get(`/${endPoint}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const updateMentorProfile = async (endPoint , datas)=>{

  try {
    const response = await authInstanceAxios.put(`/${endPoint}`,datas);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getSessions = async (endPoint)=>{

  try {
    const response = await authInstanceAxios.get(`/${endPoint}`);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getNotifications = async(endPoint)=>{
  try {
    const response = await authInstanceAxios.get(`/${endPoint}`);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const markRead = async(endPoint, notifyId)=>{
  try {
    const response = await authInstanceAxios.patch(`/${endPoint}?notificationId=${notifyId}`);
    return response.data._id
  } catch (error) {
    throw error
  }
}