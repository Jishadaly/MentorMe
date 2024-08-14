import { Users, Iuser } from '../../frameworks/database/mongoDb/models/user';
import { IUser } from '../entities/types/user/user';
import { generatePassword } from '../utils/generatePassword';
import { Encrypt } from '../helper/hashPassword';
import Availability from '../../frameworks/database/mongoDb/models/Availability';
import MentorApplication from '../../frameworks/database/mongoDb/models/mentorApplicationModel';
import ResetToken from '../../frameworks/database/mongoDb/models/resetToken';
import OTP from '../../frameworks/database/mongoDb/models/otpModel';

export const checkExistingUser = async (email: string, userName: string) => {
  const existingUser = await Users.findOne({ $or: [{ email: email }, { userName: userName }] });
  return existingUser;
}

export const checkExistingName = async (userName: string) => {
  const existingUser = await Users.findOne({ userName: userName });
  return existingUser;
}


export const createUser = async (userData: IUser, hashedPassword: string) => {
  try {
    if (!userData.email || !userData.name) {
      throw new Error("Email and name are required");
    }
    const existingUser = await checkExistingUser(userData.email, userData.name);
    const existingUserName = await checkExistingName(userData.name);

    if (existingUserName) {
      if (existingUserName.verified === false) {
        return existingUserName
      }
      throw new Error("A user with that username already exists.");
    }


    if (existingUser) {
      if (existingUser.verified === false) {
        return existingUser
      }
      throw new Error("A user with that email already exists.");
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

export const saveResetToken = async (userId: string, token: string, expires: number) => {
  try {
    const data = await ResetToken.create({
      userId: userId,
      token: token,
      expiresAt: new Date(expires),
    });

    return data
  } catch (error) {
    throw error
  }
}

export const getUserbyEMail = async (email: string) => {
  return await Users.findOne({ email: email })
}

export const getUserbyId = async (id: string) => {
  return await Users.findById(id)
}

export const sameUser = async (user: string) => {
  return await Users.findById(user)
}

export const checkIsmentor = async (email: string) => {
  return await Users.findOne({ email: email }, { isMentor: true })
}

export const checkResetToken = async (token: string) => {
  return await ResetToken.findOne({ token });
}

export const createOtp = async (email: string, otp: string) => {
  return await OTP.create({ email, otp });
}
export const getStoredOtp = async (email: string) => {
  return await OTP.findOne({ email: email }).sort({ createdAt: -1 }).exec();
}
export const deleteAllOtp = async (email: string) => {
  return await OTP.deleteMany({ email: email });
}
export const updateOtp = async (email: string, otp: string) => {
  return await OTP.findOneAndUpdate({ email }, { otp, createdAt: new Date() }, { upsert: true });
}

export const saveGoogleUser = async (userData: IUser) => {

  if (!userData.name || !userData.email) {
    throw new Error("data is undefined")
  }

  const existingUser = await checkExistingUser(userData.name, userData.name);
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
    isGoogleUser: true
  });

  return await newUser.save();


}

export const getBookdslotdb = async (userId: string) => {

  const slots = await Availability.find({ bookedBy: userId, isBooked: true }).sort({ updated_at: -1 });
  // .populate('mentorId').populate({path:'mentorAdditional'})
  // .exec();
  // console.log("slotes",slots);

  if (!slots) {
    throw new Error("there is no booked slotes")
  }

  return slots
}

export const updateUserName = async (userId: string, newField: string) => {
  try {
    console.log("herer");
    const existingUser = await checkExistingUser("emal", newField);
    if (existingUser) {
      throw Error("User name is already exist");
    }
    const updated = await Users.findByIdAndUpdate(userId, { userName: newField }, { new: true, fields: { userName: 1 } })
    return updated
  } catch (error) {
    throw error
  }
}

export const updateUserPhone = async (userId: string, newField: string) => {
  console.log("herer");

  const updated = await Users.findByIdAndUpdate(userId, { phone: newField }, { new: true, fields: { phone: 1 } })
  return updated
}


export const updateUserPass = async (userId: string, newField: string) => {

  const updated = await Users.findByIdAndUpdate(userId, { password: newField });
  return "updated";
}

export const saveProfilePicture = async (imageUrl: string, userId: string) => {
  try {
    const image = await Users.findByIdAndUpdate(userId, { profilePic: imageUrl })
    return image?.profilePic;
  } catch (error) {
    throw error
  }
}