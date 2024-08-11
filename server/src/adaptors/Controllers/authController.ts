import { Request, Response, NextFunction } from "express"
import userInteractor from "../../domain/usecases/auth/authInteractor";
import { otpGeneratorFun } from "../../domain/utils/generateOtp";
import sendMail from "../../domain/helper/sendMail";
import authInteractor from "../../domain/usecases/auth/authInteractor";
import { generateOtpEmailContent, generateResendOtpEmailContent } from "../../domain/helper/mailer/emailTempletes";
import jwt from 'jsonwebtoken';
import { generateToken } from "../../domain/helper/jwtHelper";

declare module 'express-serve-static-core' {
   interface Request {
       userId?: string;
   }
}

export default {
   userRegistration: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { name, email } = req.body;
         const user = await userInteractor.registerUser(req.body);
         if (user) {
            const otp = otpGeneratorFun();
            console.log(req.session)
            const sessionStore = req.session;
            sessionStore.otp = otp;
            sessionStore.otpGeneratedAt = Date.now()
            console.log("OTP", otp);
            const emailContent = await generateOtpEmailContent(name, otp)
            sendMail(email, emailContent);

         } else {
            res.status(400).json({ message: "User registration failed" });
         }
         res.status(200).json({ message: "user authenticated successfully", user })
      } catch (error: any) {
         console.error(error.message);
         res.status(400).json( error.message );
      }

   },

   refreshToken: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const storedRefreshToken = req.cookies.refreshToken;
         console.log({storedRefreshToken});
         if(!storedRefreshToken){
            return res.status(401).json({ message: "Refresh token not provided" });
         }
         console.log("herererere",process.env.JWT_SECRET);
         const decoded = jwt.verify(storedRefreshToken, process.env.JWT_SECRET_REFRESH!) as jwt.JwtPayload;
         console.log("here" , decoded);
         
         const { accessToken, refreshToken } = generateToken(decoded.userId, decoded.email , decoded.userRole);

         console.log({accessToken});
         
         
         res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
         res.json({ accessToken});
         
      } catch (error:any) {
         console.log(error);
         res.status(500).json(error.message);
      }
   },

   verifyOTP: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const response = await userInteractor.verifyUser(req, req.body);
         res.status(200).json({ message: "verify success", response });
      } catch (error: any) {
         console.error(error.message);
         res.status(500).json( error.message );
      }
   },

   userLogin: async (req: Request, res: Response, next: NextFunction) => {
      try {

         const { email, password } = req.body
         const response = await userInteractor.loginUser(email, password);
         const {  refreshToken } = response
         console.log({refreshToken});
         
         res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
         res.status(200).json({ message: "user login success", response })
      } catch (error: any) {
         res.status(500).json( error.message );
      }
   },

   mentorLogin: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { email, password } = req.body
         const response = await userInteractor.loginMentor(email, password);
         const {  refreshToken } = response
         console.log({refreshToken});
         
         res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
         res.status(200).json({ message: "Mentro login success", response });
      } catch (error: any) {
         console.log(error.message);
         res.status(500).json({ error: error.message });
      }
   },

   adminLogin: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { email, password } = req.body
         if (!email && !password) {
            throw new Error("user credentials not there")
         }
         const credentials = {
            email, password
         }
         const response = await authInteractor.adminLogger(credentials);
         res.status(200).json({ message: "admin logged successfully", response });
      } catch (error: any) {
         console.log(error);
         res.status(500).json({ error: error.message })
      }
   },

   googleAuth: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const response = await authInteractor.googleAuth(req.body)
         res.status(200).json({ message: "google authentication success", response });
      } catch (error) {
         console.log(error);
         res.status(500).json(error);
      }
   },

   resendOtp: async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { email } = req.query;
         const userEmail = email as string
         const user = await authInteractor.resendOtp(userEmail);
         if (!user) {
            return res.status(400).json({ message: "User not found" });
         }
         const otp = otpGeneratorFun();
         const sessionStore = req.session;
         sessionStore.otp = otp;
         sessionStore.otpGeneratedAt = Date.now()
         console.log("RESENT OTP", otp);
         const emailContent = generateResendOtpEmailContent(user.userName, otp);
         await sendMail(userEmail, emailContent);
         res.status(200).json({ message: "resend Otp sended succesfully", user });
         
      } catch (error) {
         console.log(error);
         res.status(500).json(error);
      }
   },

   uploadProfile:async (req: Request, res: Response, next: NextFunction) => {
      try {
         
         const path = req.file?.path;
         const userId = req.userId;
         if(!userId) throw Error('user not authorised')
         if (!path) throw Error('image not found')

         const imageUrl  = await authInteractor.uploadProfile(path , userId);
         console.log(imageUrl);
         
         res.status(200).json({
            profilePic: imageUrl,
            message: "Profile picture updated successfully",
        });

       } catch (error) {
         res.status(500).json(error);
         next(error);
       }
   },
}