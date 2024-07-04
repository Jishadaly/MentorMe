import { getUserbyId } from "../repositories/userRepository"

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
  }
}