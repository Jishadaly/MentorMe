import { authInstanceAxios } from "./auth/user-auth-service";


export const fetchMentorData =async (endPoint , mentorId)=>{
  
     const response = await authInstanceAxios.get(`${endPoint}`, {
      params:{
        mentorId:mentorId
      }
    });
    return response;

 
}