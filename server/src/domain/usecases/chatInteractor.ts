import chatRepository from "../repositories/chatRepository";

export default {
    startChat:async(menteeId:string , mentorId:string )=>{
       
        let chat =  await chatRepository.getChat(menteeId , mentorId);
        if(!chat){
           chat = await chatRepository.createChat(menteeId , mentorId);
        }

        return chat;
    },
    sendMessage:async(chatId:string , message:string , senderId:string)=>{
        const savedMssg = await chatRepository.saveMessage(chatId, message,senderId);
        
    },
    getAllChats:async(userId:string)=>{
        const chats = await chatRepository.getAllChat(userId)
        return chats
    },
    getMessages:async(chatId:string)=>{
        const messages = await chatRepository.getMessages(chatId);
        return messages;
    }
}