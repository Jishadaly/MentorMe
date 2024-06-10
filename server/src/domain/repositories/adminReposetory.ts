import { Admins } from "../../frameworks/database/mongoDb/models/adminModel"
import MentorApplication from "../../frameworks/database/mongoDb/models/mentorApplicationModel";
import { Users } from "../../frameworks/database/mongoDb/models/user";

export const findAdmin = async (email:string)=> await Admins.findOne({email})

export const getMentoresForVerification = async() =>{
  const requestedMentors = await MentorApplication.find({status:'Pending'});
  console.log(requestedMentors);
  return requestedMentors;
}

export const updateMentorVerificationVerify =async(userId:string)=>{
   try {
     await  Users.findByIdAndUpdate(userId , {status:"Approved"});
     return await MentorApplication.findByIdAndUpdate(userId , {isMentor:true});
   } catch (error:any) {
    throw new Error(error)
   }
}

export const updateMentorVerificationReject =async(userId:string)=>{
  try {

     await MentorApplication.findByIdAndUpdate(userId , {status:"Rejected"});
  } catch (error:any) {
   throw new Error(error)
  }
}

