import { Request, Response, NextFunction, } from "express";
import chatInteractor from "../../domain/usecases/chatInteractor";

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}

export default {

    startChat: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { menteeId, mentorId, } = req.query;

            if (!menteeId && !mentorId) throw Error("heeu");
            const mentee: any = menteeId
            const mentor: any = mentorId
            const chatId = await chatInteractor.startChat(mentee, mentor);

            res.status(200).json(chatId)
        } catch (e: any) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },
    sendMessage: async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const { chatId, message } = req.body;
            const id: string = chatId;
            const mssg: string = message;
            const senderId = req.userId;
            let imageUrl: string = '';

            if (req.file) {
                imageUrl = req.file.path; // Cloudinary URL for the uploaded image
            }
            if (!senderId) throw Error('user not authorised');
            const savedMessage = await chatInteractor.sendMessage(id, mssg, senderId, imageUrl);

            const io = req.app.get('socketio');
            io.to(chatId).emit('receiveMessage', savedMessage);

            res.status(200).json(savedMessage);
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    },
    getAllChats: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const userId = req.userId;
            if (!userId) throw Error('user not authorised')
            const chats = await chatInteractor.getAllChats(userId);

            res.status(200).json(chats);
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    },
    fetchMessages: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { chatId } = req.query;
            const userId = req.userId;
            if (!userId) throw Error("user not authorised")
            const id: any = chatId;
            if (!id) throw Error('chat id is not provided');
            const messages = await chatInteractor.getMessages(id, userId);
            res.status(200).json(messages);
        } catch (error: any) {
            console.log(error);
            res.status(500).json(error.message);

        }
    }
}