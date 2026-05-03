// import chatRepository from "../repositories/chatRepository";

// export default {
//     startChat:async(menteeId:string , mentorId:string )=>{
       
//         let chat =  await chatRepository.getChat(menteeId , mentorId);
//         if(!chat){
//            chat = await chatRepository.createChat(menteeId , mentorId);
//         }

//         return chat;
//     },
//     sendMessage:async(chatId:string , message:string , senderId:string , imageUrl:string)=>{
//         const savedMssg = await chatRepository.saveMessage(chatId, message,senderId,imageUrl);
//         return savedMssg
        
//     },
//     getAllChats:async(userId:string)=>{
//         const chats = await chatRepository.getAllChat(userId)
//         return chats
//     },
//     getMessages:async(chatId:string , userId:string)=>{
//         const messages = await chatRepository.getMessages(chatId , userId)
//         return messages;
//     }
// }



// ============================================
// 4. Updated Chat Interactor
// ============================================
import chatRepository from "../repositories/chatRepository";


export default {
  startChat: async (menteeId: string, mentorId: string) => {
    let chat = await chatRepository.getChat(menteeId, mentorId);
    
    if (!chat) {
      chat = await chatRepository.createChat(menteeId, mentorId);
    }

    return chat
  },

  sendMessage: async (
    chatId: string,
    message: string,
    senderId: string,
    imageUrl: string
  ) => {
    const savedMessage = await chatRepository.saveMessage(
      chatId,
      message,
      senderId,
      imageUrl
    );
    return savedMessage;
  },

  getAllChats: async (userId: string) => {
    const chats = await chatRepository.getAllChat(userId);
    return chats;
  },

  getMessages: async (
    chatId: string,
    userId: string,
    limit?: number,
    skip?: number
  ) => {
    const messages = await chatRepository.getMessages(chatId, userId, limit, skip);
    return messages;
  },

  deleteMessage: async (messageId: string, userId: string) => {
    const deletedMessage = await chatRepository.deleteMessage(messageId, userId);
    return deletedMessage;
  }
};
