import { authInstanceAxios } from "@/Api/axiosInstence";

export const userRegister = async ( endPoint ,userData  ) => {
    const response = await authInstanceAxios.post(`/${endPoint}`,userData);
    console.log(response,"/11111111");
    return response;
};

export const verifyOTP = async (endPoint , data)=>{
  const response = await authInstanceAxios.post(`/${endPoint}`,data);
  console.log(response);
  return response
};

export const mentorApplicationFormApi = async(endPoint , data)=>{
   console.log(data);
   const response = await authInstanceAxios.post(`/${endPoint}`,data);
   return response
}