
import { IUser } from "../../entities/types/user/user";
import { createUser, verifyUserdb, getUserbyEMail, checkIsmentor, updateUserPass, getUserbyId } from "../../repositories/userRepository";
import { Request } from "express";
import { Encrypt } from "../../helper/hashPassword";
import { generateToken } from "../../helper/jwtHelper";
import { findAdmin } from "../../repositories/adminReposetory";
import { checkExistingUser, saveGoogleUser, saveProfilePicture, saveResetToken, checkResetToken } from "../../repositories/userRepository";
import sendMail from "../../helper/sendMail";
import { generatePasswordResetEmailContent } from "../../helper/mailer/emailTempletes";
import { generateRandomToken } from "../../utils/generateRandomToken";
import { ObjectId } from 'mongodb';


export default {

    registerUser: async (userData: IUser) => {
        try {
            if (!userData.password) {
                throw new Error("Password is required.");
            }
            const hashedPassword = await Encrypt.cryptPassword(userData.password)
            const savedUser = await createUser(userData, hashedPassword)
            console.log("user Usestate", savedUser);
            return savedUser;
        } catch (error) {
            console.log(error);
            throw error;
        }

    },

    verifyUser: async (req: Request, data: { otp: string, email: string }) => {
        const storedOTP = req.session.otp;
        console.log('stored otp ' , storedOTP);
        
        if (!storedOTP || storedOTP !== data.otp) {
            throw Error("Invalid OTP vv");
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

    resendOtp: async (email: string) => {
        return await getUserbyEMail(email);

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
            if (!resetToken) throw Error('Invalid or expired reset token');

            // Check if the token has expired
            if (resetToken.expiresAt < new Date()) {
                throw Error( 'Reset token has expired');
            }
            const userId = resetToken.userId.toString();
            const user = await getUserbyId(userId);
            if(!user) throw Error('User not found');

            const hashedPassword = await Encrypt.cryptPassword(password);
            const updated = updateUserPass(userId, hashedPassword);
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
                return { user, token };
            }

        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            throw error;
        }
    },

    resetPassword: async (userId: string, newPass: string) => {
        try {
            console.log("////////", userId, newPass);
            const hashedPassword = await Encrypt.cryptPassword(newPass);
            console.log(hashedPassword);

            const pass = updateUserPass(userId, hashedPassword);
            return pass

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