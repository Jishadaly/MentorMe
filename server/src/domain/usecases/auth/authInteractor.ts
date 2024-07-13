
import { IUser } from "../../entities/types/user/user";
import { createUser , verifyUserdb , getUserbyEMail ,checkIsmentor, updateUserPass} from "../../repositories/userRepository";
import { Request } from "express";
import { Encrypt } from "../../helper/hashPassword";
import { generateToken } from "../../helper/jwtHelper";
import {  findAdmin } from "../../repositories/adminReposetory";
import { checkExistingUser , saveGoogleUser } from "../../repositories/userRepository";



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
            throw new Error("Invalid OTP")
        }

        const otpGeneratedAt = req.session.otpGeneratedAt;  
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

    resendOtp:async(email:string)=>{
        return await getUserbyEMail(email);

    }
    ,
    
    loginUser : async (email:string , password:string )=> {

        const existingUser = await getUserbyEMail(email);
        if(!existingUser){
            throw new Error('User not fount');
        }
        console.log(password);
        
        const isValid = await Encrypt.comparePassword(password , existingUser.password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        if(existingUser && existingUser.isBlocked){
            throw new Error('Account is Blocked')
        }
        const role = 'mentee'
        const token =  generateToken(existingUser.id , email , role);
        const user={ 
            id:existingUser.id,
            name:existingUser.userName,
            email:existingUser.email,
            phone:existingUser.phone
    }
        const accessToken = token.accessToken;
        const refreshToken = token.refreshToken;
        return { accessToken,refreshToken , user };
    },

loginMentor : async (email:string , password:string )=> {
        const existingUser = await getUserbyEMail(email)

        if(!existingUser){
            throw new Error('User not fount');
        }

        const isMentor = await checkIsmentor(email)
        
        if ( isMentor?.isMentor === false) {
            console.log("no mentor");
            
            throw new Error("Access Denied: You are not approved. Please confirm your application form.");
            
        }
        const isValid = await Encrypt.comparePassword(password , existingUser.password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        if(existingUser && existingUser.isBlocked){
            throw new Error('Account is Blocked')
        }
        const role = 'mentor'
        const token = await generateToken(existingUser.id , email , role)
        const user={ 
            id:existingUser.id,
            name:existingUser.userName,
            email:existingUser.email,
            phone:existingUser.phone
        }

        return { token , user }
    },

    adminLogger :async(cred:{email:string , password:string})=>{
        try {
            const admin = await findAdmin(cred.email);
  
            if (!admin) {
               throw new Error("user email not match")
            }
            if( cred.password !== admin.password ){
               throw new Error ("user entered password is not matching")
            }
            const role = 'admin'
            const token = await generateToken(admin.id , cred.email , role);
            return {admin , token}

        } catch (error:any ){
            console.error(`Error: ${error.message}`);
            throw error;
        }

     },

     googleAuth:async(userData:IUser)=>{

         try {
           
           const savedUser = await saveGoogleUser(userData );
            if (savedUser) {
                
                const user = {
                id: savedUser._id,
                name: savedUser.userName,
                email: savedUser.email,
                phone: savedUser.phone,

                }
                const role = 'mentee';
                let token = generateToken(savedUser.id ,savedUser.email , role);
                return {user , token};
            }

         } catch (error:any) {
            console.error(`Error: ${error.message}`);
            throw error;
         }

     },
     resetPassword:async(userId:string , newPass:string)=>{
        try {
          console.log("////////",userId , newPass);
          const hashedPassword = await Encrypt.cryptPassword(newPass);
          console.log(hashedPassword);

          const pass  = updateUserPass(userId , hashedPassword);
          return pass
          
        } catch (error) {
          throw error
        }
      }
}