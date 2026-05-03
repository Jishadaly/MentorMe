// import Chat from "../../frameworks/database/mongoDb/models/chat"
// import Message from "../../frameworks/database/mongoDb/models/message";
// import { Users } from "../../frameworks/database/mongoDb/models/user";

// export default {
//     getChat: async (menteeId: string, mentorId: string) => {
//         try {
//             const chat = await Chat.findOne({
//                 users: { $all: [menteeId, mentorId] }
//             })

//             return chat;
//         } catch (error) {
//             throw error
//         }
//     },
//     createChat: async (menteeId: string, mentorId: string) => {
//         try {
//             const chat = new Chat({
//                 chatName: "Mentorship Chat",
//                 users: [menteeId, mentorId],
//             });
//             await chat.save();

//             return chat
//         } catch (error) {
//             throw error
//         }
//     },
//     saveMessage: async (chatId: string, message: string, senderId: string,imageUrl:string) => {
//         try {
//             const saveMssg = new Message({
//                 sender: senderId,
//                 content: message,
//                 chat: chatId,
//                 imageUrl:imageUrl
//             });

//             const populatedMessage = await saveMssg.save()
//                 .then(savedMessage => Message.findById(savedMessage._id)
//                     .populate({
//                         path: 'sender',
//                         select: 'profilePic _id'
//                     })
//                 );

//             const savelatestmessage = await Chat.findByIdAndUpdate(chatId, { latestMessage: saveMssg._id })

//             console.log(savelatestmessage);

//             return populatedMessage;
//         } catch (error) {
//             throw error
//         }
//     },
//     getAllChat: async (userId: string) => {
//         try {

//             let results: any = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
//                 .populate("users", "-password")
//                 .populate('latestMessage')
//                 .sort({ updatedAt: -1 });


//             results = await Users.populate(results, {
//                 path: "latestMessage.sender",
//                 select: "userName email",
//             });

//             results = await Promise.all(results.map(async (chat: any) => {
//                 const unreadCount = await Message.countDocuments({
//                     chat: chat._id,
//                     isRead: false,
//                     sender: { $ne: userId }
//                 });

//                 return {
//                     ...chat.toObject(),
//                     unreadCount,
//                 };
//             }));

//             return results;
//         } catch (error) {
//             console.log(error);

//             throw error
//         }
//     },
//     getMessages: async (chatId: string, userId: string) => {
//         try {

//             const messages = await Message.find({ chat: chatId }).populate({ path: 'sender', select: 'profilePic' });
//             await Message.updateMany({ chat: chatId, isRead: false, readBy: { $ne: userId } }, { $set: { isRead: true }, $addToSet: { readBy: userId } });
//             return messages;
            
//         } catch (error) {
//             throw error
//         }
//     }
// }



// ============================================
// 2. Optimized Chat Repository
// ============================================
import Chat from "../../frameworks/database/mongoDb/models/chat";
import Message from "../../frameworks/database/mongoDb/models/message";
import { Users } from "../../frameworks/database/mongoDb/models/user";

type ChatType = {
    _id: string;
    chatName: string;
    users: any[]; // or define proper user type later
  };

export default {
  getChat: async (menteeId: string, mentorId: string) :Promise<ChatType | null > => {
    try {
      const chat = await Chat.findOne({
        users: { $all: [menteeId, mentorId] }
      }).lean() as ChatType | null; // Use lean() for better performance 

      return chat;
    } catch (error) {
      throw error;
    }
  },

  createChat: async (menteeId: string, mentorId: string) : Promise <ChatType | null >  => {
    try {
      const chat = await Chat.create({
        chatName: "Mentorship Chat",
        users: [menteeId, mentorId],
      })

      return chat.toObject() as ChatType
    } catch (error) {
      throw error;
    }
  },

  saveMessage: async (
    chatId: string,
    message: string,
    senderId: string,
    imageUrl: string
  ) => {
    try {
      const newMessage = await Message.create({
        sender: senderId,
        content: message,
        chat: chatId,
        imageUrl: imageUrl || null,
        isRead: false
      });

      // Populate sender info
      const populatedMessage = await Message.findById(newMessage._id)
        .populate({
          path: 'sender',
          select: 'profilePic userName _id'
        })
        .lean();

      // Update latest message in chat (async, don't wait)
      Chat.findByIdAndUpdate(
        chatId,
        {
          latestMessage: newMessage._id,
          updatedAt: new Date()
        },
        { new: true }
      ).exec();

      return populatedMessage;
    } catch (error) {
      throw error;
    }
  },

  getAllChat: async (userId: string) => {
    try {
      let results = await Chat.find({ 
        users: { $elemMatch: { $eq: userId } } 
      })
        .populate("users", "userName profilePic")
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender',
            select: 'userName'
          }
        })
        .sort({ updatedAt: -1 })
        .lean();

      // Get unread counts in parallel
      const chatsWithUnread = await Promise.all(
        results.map(async (chat: any) => {
          const unreadCount = await Message.countDocuments({
            chat: chat._id,
            isRead: false,
            sender: { $ne: userId }
          });

          return {
            ...chat,
            unreadCount,
          };
        })
      );

      return chatsWithUnread;
    } catch (error) {
      console.error('Get all chats error:', error);
      throw error;
    }
  },

  getMessages: async (chatId: string, userId: string, limit: number = 50, skip: number = 0) => {
    try {
      // Fetch messages with pagination
      const messages = await Message.find({ chat: chatId })
        .populate({ path: 'sender', select: 'profilePic userName' })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean();

      // Mark as read (async operation, don't block response)
      Message.updateMany(
        {
          chat: chatId,
          isRead: false,
          sender: { $ne: userId }
        },
        {
          $set: { isRead: true },
          $addToSet: { readBy: userId }
        }
      ).exec();

      // Return in chronological order
      return messages.reverse();
    } catch (error) {
      throw error;
    }
  },

  // New: Get message count for pagination
  getMessageCount: async (chatId: string) => {
    try {
      return await Message.countDocuments({ chat: chatId });
    } catch (error) {
      throw error;
    }
  },

  // New: Delete message
  deleteMessage: async (messageId: string, userId: string) => {
    try {
      const message = await Message.findOne({ _id: messageId, sender: userId });
      
      if (!message) {
        throw new Error('Message not found or unauthorized');
      }

      await Message.findByIdAndDelete(messageId);
      return message;
    } catch (error) {
      throw error;
    }
  }
};
