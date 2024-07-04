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
    const saveFormInUser = await Users.findByIdAndUpdate(userId , {mentorAdditional:id});

    console.log("update user",userUpdate);
    
    return  await MentorApplication.findByIdAndUpdate(id , {status:"Approved"});
   } catch (error:any) {
    throw new Error(error);
   }
}




export const updateMentorVerificationReject =async(id:string , userId:string)=>{
  try {
      const mentorapp =  await MentorApplication.findByIdAndUpdate(id , {status:"Rejected"});
     
     return mentorapp;
  } catch (error:any) {
   throw new Error(error)
  }
}

export const getAllUsers = async()=>{
  try {
     const data = await Users.find({verified:true , isMentor:false});
     console.log(data);
     
     return data
  } catch (error) {
   throw error
  }
} 

export const getAllMentors = async()=>{
  try {
    const data = await Users.find({verified:true,isMentor:true});
     console.log(data);
     return data;
  } catch (error) {
    throw error
  }
}


export const updateBlockStatus = async (userId : string,isBlocked:boolean) => {
  try {
    // Find the user by ID and update the isBlocked status
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { isBlocked: isBlocked },
      { new: true } // Return the updated document
    );

    console.log("updated status",updatedUser);
    

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error updating block status:', error);
    throw error;
  }
};