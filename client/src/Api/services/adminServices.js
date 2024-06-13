
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

