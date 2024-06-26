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

export const deleteSlot = async(endPoint , slotId)=>{
  try {
    const response  = await authInstanceAxios.delete(`/${endPoint}?slotId=${slotId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
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