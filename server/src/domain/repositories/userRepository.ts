import { Users, Iuser } from '../../frameworks/database/mongoDb/models/user';
import { IUser } from '../entities/types/user/user';
import { generatePassword } from '../utils/generatePassword';
import { Encrypt } from '../helper/hashPassword';
import Availability from '../../frameworks/database/mongoDb/models/Availability';
import MentorApplication from '../../frameworks/database/mongoDb/models/mentorApplicationModel';


export const checkExistingUser = async (email: string, userName: string) => {
  const existingUser = await Users.findOne({ $or: [{ email: email }, { userName: userName }] });
  return existingUser;
}


export const createUser = async (userData: IUser , hashedPassword:string) => {
  try {
    if (!userData.email || !userData.name) {
      throw new Error("Email and name are required");
    }
    const existingUser = await checkExistingUser(userData.email, userData.name);
    if (existingUser) {
      
      if (existingUser.verified === false) {
          return existingUser
      }
      throw new Error("A user with that email or username already exists.");
    }
    const newUser = new Users({
      userName: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
    });
    return await newUser.save();

  } catch (error) {
    throw error
  }
}


export const verifyUserdb = async (email: string) => {
  const userData = await Users.findOneAndUpdate(
    { email: email },
    { $set: { verified: true } },
    { new: true }
  );
  return userData;
}

export const getUserbyEMail = async (email:string)=> {
    return await Users.findOne({email:email})
}

export const getUserbyId = async (id:string)=> {
  return await Users.findById(id)
}

export const sameUser = async(user:string)=>{
   return await Users.findById(user)
}

export const checkIsmentor = async(email:string)=>{ 
  return await Users.findOne({email:email} , {isMentor:true})
}

export const saveGoogleUser =async(userData:IUser)=>{

     if(!userData.name || !userData.email){
      throw new Error("data is undefined")
     }

     const existingUser = await checkExistingUser(userData.name , userData.name);
     if (existingUser) {
        return existingUser
     }

      const generatedPss = Math.random().toString(36).slice(-8);
      const hashedPassword = await Encrypt.cryptPassword(generatedPss)

      const newUser = new Users({
      userName: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
      isGoogleUser:true
    });
    
    return await newUser.save();


}

export const getBookdslotdb=async(userId:string)=>{
  
  const slots = await Availability.find({ bookedBy: userId , isBooked:true})
  // .populate('mentorId').populate({path:'mentorAdditional'})
  // .exec();
  // console.log("slotes",slots);
  
   if(!slots){
   throw new Error("there is no booked slotes")
  }

    return slots
}

export const updateUserName = async (userId:string, newField:string)=>{
 try {
  console.log("herer");
  const existingUser = await checkExistingUser("emal" , newField);
  if (existingUser) {
    throw Error("User name is already exist");
  }
  const updated = await Users.findByIdAndUpdate(userId , {userName:newField} , { new: true, fields: { userName: 1 } })
  return updated
 } catch (error) {
  throw error
 }
}

export const updateUserPhone = async (userId:string, newField:string)=>{
  console.log("herer");
  
  const updated = await Users.findByIdAndUpdate(userId , {phone:newField} , { new: true, fields: { phone: 1 } })
  return updated
}


export const updateUserPass = async (userId:string, newField:string)=>{
  
  const updated = await Users.findByIdAndUpdate(userId , { password:newField });
  return "updated";
}

