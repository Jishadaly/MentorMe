
import { authInstanceAxios } from "./auth/user-auth-service"

export const getApplicationMentores = async(endPoint) =>{
  try {
    const response = await authInstanceAxios.get(`/${endPoint}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const verifyApplication = async(endPoint , userId) =>{
  try {
    const response = await authInstanceAxios.post(`/${endPoint}`,{userId})
      return response;

  } catch (error) {
    console.log(error);
  }
}

export const rejectApplication = async (endPoint , userId) => {

  try {
    const response = await authInstanceAxios.post(`/${endPoint}`,{userId})
      return response;

} catch (error) {
  console.log(error);
}

}

