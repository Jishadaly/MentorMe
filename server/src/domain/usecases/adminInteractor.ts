import {  getMentoresForVerification ,updateMentorVerificationVerify , updateMentorVerificationReject} from "../repositories/adminReposetory"
import { findAdmin } from "../repositories/adminReposetory";


export default {
  adminLogger :async(cred:{email:string , password:string})=>{
      const admin = await findAdmin(cred.email);

      if (!admin) {
         throw new Error("user email not match")
      }

      if( cred.password !== admin.password ){
         throw new Error ("user enterd password is not matching")
      }

      return admin;
   },
   getMentorsforVerification:async()=>{
      try {
         const data = await getMentoresForVerification();
         return data
      } catch (error:any) {
         throw new Error(error)
      }
      
   },
   verifyMentorRequest:async(id:string , userId:string)=>{
      console.log("applicationid" , id , "userid", userId);
      
      try {
         const response  = await updateMentorVerificationVerify(id,userId);
         return response;
      } catch (error:any) {
         throw new Error(error)
      }
   },
   rejectMentorRequest:async(id:string , userId:string)=>{
      try {
         const response  = await updateMentorVerificationReject(id,userId);
         return response;
      } catch (error:any) {
         throw new Error(error)
      }
   },

   
}