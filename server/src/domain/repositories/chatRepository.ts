import Chat from "../../frameworks/database/mongoDb/models/chat"
import Message from "../../frameworks/database/mongoDb/models/message";
import { Users } from "../../frameworks/database/mongoDb/models/user";

export default {
    getChat: async (menteeId: string, mentorId: string) => {
        try {
            const chat = await Chat.findOne({
                users: { $all: [menteeId, mentorId] }
            })

            return chat;
        } catch (error) {
            throw error
        }
    },
    createChat: async (menteeId: string, mentorId: string) => {
        try {
            const chat = new Chat({
                chatName: "Mentorship Chat",
                users: [menteeId, mentorId],
            });
            await chat.save();

            return chat
        } catch (error) {
            throw error
        }
    },
    saveMessage: async (chatId: string, message: string, senderId: string,imageUrl:string) => {
        try {
            const saveMssg = new Message({
                sender: senderId,
                content: message,
                chat: chatId,
                imageUrl:imageUrl
            });

            const populatedMessage = await saveMssg.save()
                .then(savedMessage => Message.findById(savedMessage._id)
                    .populate({
                        path: 'sender',
                        select: 'profilePic _id'
                    })
                );

            const savelatestmessage = await Chat.findByIdAndUpdate(chatId, { latestMessage: saveMssg._id })

            console.log(savelatestmessage);

            return populatedMessage;
        } catch (error) {
            throw error
        }
    },
    getAllChat: async (userId: string) => {
        try {

            let results: any = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
                .populate("users", "-password")
                .populate('latestMessage')
                .sort({ updatedAt: -1 });


            results = await Users.populate(results, {
                path: "latestMessage.sender",
                select: "userName email",
            });

            results = await Promise.all(results.map(async (chat: any) => {
                const unreadCount = await Message.countDocuments({
                    chat: chat._id,
                    isRead: false,
                    sender: { $ne: userId }
                });

                return {
                    ...chat.toObject(),
                    unreadCount,
                };
            }));

            return results;
        } catch (error) {
            console.log(error);

            throw error
        }
    },
    getMessages: async (chatId: string, userId: string) => {
        try {

            const messages = await Message.find({ chat: chatId }).populate({ path: 'sender', select: 'profilePic' });
            await Message.updateMany({ chat: chatId, isRead: false, readBy: { $ne: userId } }, { $set: { isRead: true }, $addToSet: { readBy: userId } });
            return messages;
            
        } catch (error) {
            throw error
        }
    }
}