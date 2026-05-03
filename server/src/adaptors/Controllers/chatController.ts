// import { Request, Response, NextFunction, } from "express";
// import chatInteractor from "../../domain/usecases/chatInteractor";

// declare module 'express-serve-static-core' {
//     interface Request {
//         userId?: string;
//     }
// }

// export default {

//     startChat: async (req: Request, res: Response, next: NextFunction) => {

//         try {
//             const { menteeId, mentorId, } = req.query;
//             if (!menteeId && !mentorId) throw Error("they are not provided mentor id and mentee id");
//             const mentee: any = menteeId
//             const mentor: any = mentorId
//             const chatId = await chatInteractor.startChat(mentee, mentor);
//             res.status(200).json(chatId)
//         } catch (e: any) {
//             console.log(e);
//             res.status(400).json(e.message);
//         }
//     },

//     sendMessage: async (req: Request, res: Response, next: NextFunction) => {
//         try {
            
//             const { chatId, message } = req.body;
//             const id: string = chatId;
//             const mssg: string = message;
//             const senderId = req.userId;
//             let imageUrl: string = '';

//             if (req.file) {
//                 imageUrl = req.file.path;
//             }
//             if (!senderId) throw Error('user not authorised');
//             const savedMessage = await chatInteractor.sendMessage(id, mssg, senderId, imageUrl);

//             const io = req.app.get('socketio');
//             io.to(chatId).emit('receiveMessage', savedMessage);

//             res.status(200).json(savedMessage);
//         } catch (error: any) {
//             res.status(500).json(error.message)
//         }
//     },
//     getAllChats: async (req: Request, res: Response, next: NextFunction) => {

//         try {
//             const userId = req.userId;
//             if (!userId) throw Error('user not authorised')
//             const chats = await chatInteractor.getAllChats(userId);

//             res.status(200).json(chats);
//         } catch (error: any) {
//             res.status(500).json(error.message)
//         }
//     },
//     fetchMessages: async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { chatId } = req.query;
//             const userId = req.userId;
//             if (!userId) throw Error("user not authorised")
//             const id: any = chatId;
//             if (!id) throw Error('chat id is not provided');
//             const messages = await chatInteractor.getMessages(id, userId);
//             res.status(200).json(messages);
//         } catch (error: any) {
//             console.log(error);
//             res.status(500).json(error.message);

//         }
//     }
// }



// ============================================
// 3. Improved Chat Controller
// ============================================
import { Request, Response, NextFunction } from "express";
import chatInteractor from "../../domain/usecases/chatInteractor";

export default {
  startChat: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { menteeId, mentorId } = req.query;
      
      if (!menteeId || !mentorId) {
        return res.status(400).json({ error: "Mentor ID and Mentee ID are required" });
      }

      const chatId = await chatInteractor.startChat(
        menteeId as string,
        mentorId as string
      );

      res.status(200).json(chatId);
    } catch (error: any) {
      console.error('Start chat error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  sendMessage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId, message } = req.body;
      const senderId = req.userId;
      
      if (!senderId) {
        return res.status(401).json({ error: 'User not authorized' });
      }

      if (!chatId) {
        return res.status(400).json({ error: 'Chat ID is required' });
      }

      let imageUrl = '';
      if (req.file) {
        imageUrl = req.file.path;
      }

      const savedMessage = await chatInteractor.sendMessage(
        chatId,
        message || '',
        senderId,
        imageUrl
      );

      // Emit socket event
      const io = req.app.get('socketio');
      io.to(chatId).emit('receiveMessage', savedMessage);

      res.status(200).json(savedMessage);
    } catch (error: any) {
      console.error('Send message error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getAllChats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      
      if (!userId) {
        return res.status(401).json({ error: 'User not authorized' });
      }

      const chats = await chatInteractor.getAllChats(userId);
      res.status(200).json(chats);
    } catch (error: any) {
      console.error('Get all chats error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  fetchMessages: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId, limit, skip } = req.query;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: "User not authorized" });
      }

      if (!chatId) {
        return res.status(400).json({ error: 'Chat ID is required' });
      }

      const messages = await chatInteractor.getMessages(
        chatId as string,
        userId,
        limit ? parseInt(limit as string) : undefined,
        skip ? parseInt(skip as string) : undefined
      );

      res.status(200).json(messages);
    } catch (error: any) {
      console.error('Fetch messages error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteMessage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { messageId } = req.params;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: 'User not authorized' });
      }

      const deletedMessage = await chatInteractor.deleteMessage(messageId, userId);
      
      // Emit socket event
      const io = req.app.get('socketio');
      io.to(deletedMessage.chat.toString()).emit('messageDeleted', { messageId });

      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error: any) {
      console.error('Delete message error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};
