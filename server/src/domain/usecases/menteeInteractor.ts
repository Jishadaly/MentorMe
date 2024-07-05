import { getUserbyId , updateUserName ,updateUserPhone } from "../repositories/userRepository"

export default {
  getMentee:async(userId:string)=>{
   try {
    const mentee = await getUserbyId(userId);
    if (!mentee) {
      throw Error("user not found");
    }
    return mentee
   } catch (error) {
    return error
   }
  },
  editMenteeProfile:async(userId:string , field:string , newVal:string)=>{
    try {

      let response;
      switch(field){
        case "name" :
          console.log("nameeee");
          response = await updateUserName(userId , newVal);
          break;
          case "phone" :
          response = await updateUserPhone(userId , newVal);
            
          break;
      }

     if (!response) {
      throw Error("no respnse")
     }

     return response;

    } catch (error) {
     throw error
    }
  },
}