
import { authInstanceAxios } from "../axiosInstence";

export const getApplicationMentores = async(endPoint) =>{
  try {
    const response = await authInstanceAxios.get(`/${endPoint}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const verifyApplication = async(endPoint , userData) =>{
  try {
    const response = await authInstanceAxios.post(`/${endPoint}`,{userData})
      return response;

  } catch (error) {
    console.log(error);
  }
}

export const rejectApplication = async (endPoint , userData) => {

  try {
    const response = await authInstanceAxios.post(`/${endPoint}`,{userData})
      return response;

} catch (error) {
  console.log(error);
}

}

export const fetchAllUsers = async(endPoint)=>{
  try {
    const response =await authInstanceAxios.get(`/${endPoint}`);
    return response
  } catch (error) {
    console.log(error);
  }
}

export const fetchAllMentors  = async(endPoint)=>{
  try {
    const response =await authInstanceAxios.get(`/${endPoint}`);
    return response
  } catch (error) {
    console.log(error);
  }
}

export const updateBlockStatus = async (endPoint , id , isBlocked , )=>{
  try {
    const response = await authInstanceAxios.patch(`/${endPoint}?userId=${id}&isBlocked=${isBlocked}`);
    return response
  } catch (error) {
    console.log(error);
  }
}
