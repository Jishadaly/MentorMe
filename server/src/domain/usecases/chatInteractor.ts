import chatRepository from "../repositories/chatRepository";

export default {
    startChat:async(menteeId:string , mentorId:string )=>{
       
        let chat =  await chatRepository.getChat(menteeId , mentorId);
        if(!chat){
           chat = await chatRepository.createChat(menteeId , mentorId);
        }

        return chat;
    },
    sendMessage:async(chatId:string , message:string , senderId:string , imageUrl:string)=>{
        const savedMssg = await chatRepository.saveMessage(chatId, message,senderId,imageUrl);
        return savedMssg
        
    },
    getAllChats:async(userId:string)=>{
        const chats = await chatRepository.getAllChat(userId)
        return chats
    },
    getMessages:async(chatId:string , userId:string)=>{
        const messages = await chatRepository.getMessages(chatId , userId)
        return messages;
    }
}