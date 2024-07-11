import { getUserbyId , updateUserName ,updateUserPhone } from "../repositories/userRepository"
import authInteractor from "./auth/authInteractor";

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
          response = await updateUserName(userId , newVal);
          break;
          case "phone" :
          response = await updateUserPhone(userId , newVal);
          break;

          case "password" :
          response = await authInteractor.resetPassword(userId , newVal)
          break;
      };

     if (!response) {
      throw Error("no response")
     }

     return response;

    } catch (error) {
     throw error
    }
  },
  
}