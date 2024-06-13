import { Admins } from "../../frameworks/database/mongoDb/models/adminModel"
import MentorApplication from "../../frameworks/database/mongoDb/models/mentorApplicationModel";
import { Users } from "../../frameworks/database/mongoDb/models/user";

export const findAdmin = async (email:string)=> await Admins.findOne({email})

export const getMentoresForVerification = async() =>{
  const requestedMentors = await MentorApplication.find({status:'Pending'});
  console.log(requestedMentors);
  return requestedMentors;
}

export const updateMentorVerificationVerify =async(id:string , userId:string)=>{
   try {
    console.log(id,userId);
    
    const userUpdate = await Users.updateOne(  {_id:userId} , { isMentor: true });
    console.log("update user",userUpdate);
    
    return  await MentorApplication.findByIdAndUpdate(id , {status:"Approved"});
   } catch (error:any) {
    throw new Error(error);
   }
}




export const updateMentorVerificationReject =async(id:string , userId:string)=>{
  try {
     return  await MentorApplication.findByIdAndUpdate(id , {status:"Rejected"});
  } catch (error:any) {
   throw new Error(error)
  }
}

