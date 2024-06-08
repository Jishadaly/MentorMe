import { Users, Iuser } from '../../frameworks/database/mongoDb/models/user';
import { IUser } from '../entities/types/user/user';


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

export const sameUser = async(user:string)=>{
   return await Users.findById(user)
}