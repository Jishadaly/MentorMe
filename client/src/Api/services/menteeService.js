  import { authInstanceAxios } from "../axiosInstence";


export const fetchMentorData =async (endPoint , mentorId)=>{
  
     try {
      const response = await authInstanceAxios.get(`${endPoint}`, {
        params:{
          mentorId:mentorId
        }
      });
      return response;
     } catch (error) {
      console.log(error);
     }
    
}
export const slotBookingbyMentee = async(endPoint , datas)=>{
  console.log(endPoint , datas);
  try {
    return await authInstanceAxios.post(`${endPoint}`,datas);
  } catch (error) {
    console.log(error);
  }
}

  export const createCheckoutSession = async (endPoint , datas)=>{
    console.log(endPoint , datas);
    try {
      return await authInstanceAxios.post(`${endPoint}`,datas);
    } catch (error) {
      console.log(error);
    }
  }

