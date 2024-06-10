import { Request, Response, NextFunction } from "express"
import userInteractor from "../../domain/usecases/auth/authInteractor";
import { otpGeneratorFun } from "../../domain/utils/generateOtp";
import sendMail from "../../domain/helper/sendMail";
import authInteractor from "../../domain/usecases/auth/authInteractor";
// const session = require('express-session')
// import session from 'express-session'


export default {
      userRegistration : async (req: Request, res: Response, next: NextFunction ) => {
         try {
            const { name , email } = req.body;
            const user = await userInteractor.registerUser(req.body);
            if (user) {
               const otp= otpGeneratorFun();
               console.log(req.session)
               const sessionStore =  req.session; 
               sessionStore.otp = otp;       
               sessionStore.otpGeneratedAt = Date.now()
               sendMail(req,name , email,otp);
               

            }else{
               res.status(400).json({ message: "User registration failed" });
            }
            res.status(200).json({message:"user authenticated successfully",user})
         } catch (error :any){
            console.error(error.message);
             res.status(400).json({ error: error.message });
         next(error)
      }

  },

  verifyOTP : async (req: Request , res:Response , next: NextFunction) => {
      try {
          const response = await userInteractor.verifyUser(req, req.body);
          console.log(response);
          res.status(200).json({message : "verify success" , response})
      } catch (error:any) {
         console.error(error.message);
          res.status(500).json({ error: error.message });
         next(error)
      }
  },

  userLogin: async (req:Request , res:Response , next:NextFunction) =>{
      try {

          console.log(req.body);
          const { email , password } = req.body
          const response = await userInteractor.loginUser(email ,password);
          res.status(200).json({message : "user login success" , response})
      } catch (error:any) {
         console.log(error.message);
         res.status(500).json({error: error.message});
         next(error);
      }
  },

  mentorLogin: async (req:Request , res:Response , next:NextFunction) =>{
   try {

       console.log(req.body);
       const { email , password } = req.body
       const response = await userInteractor.loginMentor(email ,password);
       console.log(response);
       
       res.status(200).json({message : "Mentro login success" , response})
   } catch (error:any) {
      console.log(error.message);
      res.status(500).json(error);
      next(error);
   }
},

  adminLogin:async(req:Request , res:Response , next:NextFunction)=>{
   try {

      console.log(req.body);
      
     const { email , password } = req.body
      if (!email && !password) {
         throw new Error("user credentials not there")
      }
     const credentials = {
       email , password
     }
      const response = await authInteractor.adminLogger(credentials);
      res.status(200).json({message:"admin logged successfully" , response});
   } catch (error:any) {
      console.log(error);
      res.status(500).json({error:error.message})
   }
}               

}

