import { IUser } from "../../entities/types/user/user";
import { createUser, verifyUserdb, getUserbyEMail, checkIsmentor, updateUserPass, getUserbyId, createOtp } from "../../repositories/userRepository";
import { Encrypt } from "../../helper/hashPassword";
import { generateToken } from "../../helper/jwtHelper";
import { findAdmin } from "../../repositories/adminReposetory";
import { checkExistingUser, saveGoogleUser, saveProfilePicture, saveResetToken, checkResetToken , deletePassResetToken , getStoredOtp , deleteAllOtp , updateOtp} from "../../repositories/userRepository";
import sendMail from "../../helper/sendMail";
import { generateOtpEmailContent, generatePasswordResetEmailContent, generateResendOtpEmailContent } from "../../helper/mailer/emailTempletes";
import { generateRandomToken } from "../../utils/generateRandomToken";
import { otpGeneratorFun } from "../../utils/generateOtp";

export default {

    registerUser: async (userData: IUser) => {
        try {
            if (!userData.password) {
                throw new Error("Password is required.");
            }
            const hashedPassword = await Encrypt.cryptPassword(userData.password)
            const savedUser = await createUser(userData, hashedPassword)
            if (savedUser) {
                const otp = otpGeneratorFun();
                console.log("OTP : " ,otp);
                
                await createOtp(savedUser.email, otp)
                const emailContent =  generateOtpEmailContent(savedUser.userName, otp);
                sendMail(savedUser.email, emailContent);
             } else {
                throw Error( "User registration failed" );
             }

            return savedUser;
        } catch (error) {
            console.log(error);
            throw error;
        }

    },
    
    verifyUser: async ( data: { otp: string, email: string }) => {
        const otpRecord = await getStoredOtp(data.email)
        
        if (!otpRecord || otpRecord.otp !== data.otp) {
            throw Error("Invalid OTP");
        }

        const otpAge = Date.now() - otpRecord.createdAt.getTime();
        const expireOTP = 1 * 60 * 1000;
    
        if (otpAge > expireOTP) {
             await deleteAllOtp(otpRecord.email);
            throw new Error('OTP expired');
        }

        // Clear OTP from db after successful verification  
        await deleteAllOtp(otpRecord.email);

        return await verifyUserdb(data.email);
    },

    resendOtp: async (email: string) => {
        try {
            const user =  await getUserbyEMail(email);
            if (!user) {
                throw Error( "User not found" );
             }
             const otp = otpGeneratorFun();
             console.log("RESENT OTP", otp);
             await updateOtp(email , otp);
             const emailContent = generateResendOtpEmailContent(user.userName, otp);
             await sendMail(user.email, emailContent);
             return user
        } catch (error) {
            throw error
        }
    },

    loginUser: async (email: string, password: string) => {
        try {
            const existingUser = await getUserbyEMail(email);
            if (!existingUser) {
                throw new Error('No account found with this email address.');
            }
            console.log(password);

            const isValid = await Encrypt.comparePassword(password, existingUser.password);
            if (!isValid) {
                throw new Error("Invalid password");
            }
            if (existingUser && existingUser.isBlocked) {
                throw new Error('Account is Blocked')
            }
            const role = 'mentee'
            const token = generateToken(existingUser.id, email, role);
            const user = {
                id: existingUser.id,
                name: existingUser.userName,
                email: existingUser.email,
                phone: existingUser.phone,
                isMentor: existingUser.isMentor
            }
            const accessToken = token.accessToken;
            const refreshToken = token.refreshToken;
            return { accessToken, refreshToken, user };
        } catch (error: any) {
            throw error
        }
    },

    loginMentor: async (email: string, password: string) => {
        const existingUser = await getUserbyEMail(email)

        if (!existingUser) {
            throw new Error('User not fount');
        }

        const isMentor = await checkIsmentor(email)

        if (isMentor?.isMentor === false) {
            throw new Error("Access Denied: You are not approved. Please confirm your application form.");

        }
        const isValid = await Encrypt.comparePassword(password, existingUser.password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        if (existingUser && existingUser.isBlocked) {
            throw new Error('Account is Blocked')
        }
        const role = 'mentor'
        const { accessToken, refreshToken } = await generateToken(existingUser.id, email, role)
        const user = {
            id: existingUser.id,
            name: existingUser.userName,
            email: existingUser.email,
            phone: existingUser.phone,
            isMentor: existingUser.isMentor
        }

        return { accessToken, refreshToken, user }
    },

    adminLogger: async (cred: { email: string, password: string }) => {
        try {
            const admin = await findAdmin(cred.email);
            if (!admin) {
                throw new Error("user email not match")
            }
            if (cred.password !== admin.password) {
                throw new Error("user entered password is not matching")
            }
            const role = 'admin'
            const token = await generateToken(admin.id, cred.email, role);
            return { admin, token }

        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            throw error;
        }

    },

    forgotResetPassword: async (token: string, password: string) => {
        try {
            const resetToken = await checkResetToken(token);
            if (!resetToken) throw Error('Invalid reset token');

            // Check if the token has expired
            if (resetToken.expiresAt < new Date()) {
                throw Error( 'Reset token has expired');
            }
            const userId = resetToken.userId.toString();
            const user = await getUserbyId(userId);
            if(!user) throw Error('User not found');

            const hashedPassword = await Encrypt.cryptPassword(password);
            const updated = updateUserPass(userId, hashedPassword);
            await deletePassResetToken(token)
            return updated;
            
        } catch (error) {
            throw error
        }
    },

    googleAuth: async (userData: IUser) => {

        try {
            const savedUser = await saveGoogleUser(userData);
            if (savedUser) {
                const user = {
                    id: savedUser._id,
                    name: savedUser.userName,
                    email: savedUser.email,
                    phone: savedUser.phone,
                }
                const role = 'mentee';
                let token = generateToken(savedUser.id, savedUser.email, role);
                return { user, token : token.accessToken };
            }
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            throw error;
        }
    },

    resetPassword: async (userId: string, newPass: string) => {
        try {

            const hashedPassword = await Encrypt.cryptPassword(newPass);
            return updateUserPass(userId, hashedPassword);
        } catch (error) {
            throw error
        }
    },

    uploadProfile: async (imageUrl: string, userId: string) => {
        try {
            const image = await saveProfilePicture(imageUrl, userId);
            return image;
        } catch (error) {
            throw error
        }
    },

    sendForgotPasswordLink: async (email: string) => {
        try {
            const isExisting = await checkExistingUser(email, 'undifined');
            if (!isExisting) throw Error('user is not existing');
            const name = isExisting.userName as string;
            const userId = isExisting._id as string;
            const { token, expires }: { token: string, expires: number } = await generateRandomToken();
            const stored = await saveResetToken(userId, token, expires);
            const emailContent = await generatePasswordResetEmailContent(name, token)
            await sendMail(email, emailContent);
            return { success: true };
        } catch (error) {
            throw error
        }
    }
}