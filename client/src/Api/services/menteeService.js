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
      const response = await authInstanceAxios.post(`/${endPoint}`,datas)
      return response.data
    } catch (error) {
      console.log(error);
    }
  }


  export const fetchBookedSlotes = async (endPoint ,datas) =>{
    console.log(endPoint);
    try {
      const response = await authInstanceAxios.get(`/${endPoint}?userId=${datas}`);
      return response.data
    } catch (error) {
      console.log(error);
    }
  }


  export const getMentee =async (endPoint , datas)=>{
    try {
      const response = await authInstanceAxios.get(`/${endPoint}?userId=${datas}`)
      return response.data
    } catch (error) {
      console.log(error);
    }
  }


  export const updateName =async (endPoint , datas)=>{
   
      console.log(datas,"/'/'/'/");
      const response = await authInstanceAxios.post(`/${endPoint}`,datas);
      return response.data
    
  }

  export const addPost =async (endPoint , datas)=>{
   
    const response = await authInstanceAxios.post(`/${endPoint}`,datas);
  
    return response.data
  
}


export const getBlogs =async (endPoint )=>{
  const response = await authInstanceAxios.get(`/${endPoint}`);
  console.log("/'/'/'/'/'/'",response);
  return response.data
}

  export const getMentorBlogs =async (endPoint , mentorId )=>{
  const response = await authInstanceAxios.get(`/${endPoint}?mentorId=${mentorId}`);
  return response.data

}

export const fetchBlog =async (endPoint , blogId )=>{
  const response = await authInstanceAxios.get(`/${endPoint}?blogId=${blogId}`);
  return response.data

}


export const updatePost =async (endPoint , datas)=>{  
  const response = await authInstanceAxios.post(`/${endPoint}`,datas);
  return response.data

}


export const deleteBlog =async (endPoint, blogId )=>{
  const response = await authInstanceAxios.delete(`/${endPoint}?blogId=${blogId}`);
  return response.data
}