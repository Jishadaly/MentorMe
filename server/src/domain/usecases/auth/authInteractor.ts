
import { IUser } from "../../entities/types/user/user";
import { createUser , verifyUserdb , getUserbyEMail } from "../../repositories/userRepository";
import { Request } from "express";
import { Encrypt } from "../../helper/hashPassword";
import { generateToken } from "../../helper/jwtHelper";



export default {
    registerUser: async (userData:IUser) =>{
        try {
            if (!userData.password) {
                throw new Error("Password is required.");
            }
            const hashedPassword = await Encrypt.cryptPassword(userData.password)
            const savedUser = await createUser(userData , hashedPassword)
            console.log("user Usestate",savedUser);
            return savedUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    verifyUser: async (req:Request , data:{otp:string , email:string}) =>{

        const storedOTP = req.session.otp;
        
        if (!storedOTP || storedOTP !== data.otp) {
            console.log("ivalid otp");
            throw new Error("Invalid OTP");
        }

        const otpGeneratedAt = req.session.otpGeneratedAt;
        console.log("generated time" ,otpGeneratedAt);  

        const currentTime = Date.now();
        const otpAge = currentTime - otpGeneratedAt!; 

        const expireOTP = 1 * 60 * 1000;
        if (otpAge > expireOTP) {
            delete req.session.otp;
            delete req.session.otpGeneratedAt;
            throw new Error('otp expired');
          }

        // Clear OTP from session after successful verification
        delete req.session.otp;
        delete req.session.otpGeneratedAt;

        return await verifyUserdb(data.email);
    },

    loginUser : async (email:string , password:string )=> {
        const existingUser = await getUserbyEMail(email);
        if(!existingUser){
            throw new Error('User not fount');
        }
        const isValid = await Encrypt.comparePassword(password , existingUser.password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        if(existingUser && existingUser.isBlocked){
            throw new Error('Account is Blocked');
        }
        
        const token = await generateToken(existingUser.id , email)
        const user={ 
            id:existingUser.id,
            name:existingUser.userName,
            email:existingUser,
            phone:existingUser.phone
        }

        return { token , user }
    }

}