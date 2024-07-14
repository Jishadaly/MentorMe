import chatRepository from "../repositories/chatRepository";

export default {
    startChat:async(menteeId:string , mentorId:string )=>{
        console.log(menteeId , mentorId);
        
        let chat =  await chatRepository.getChat(menteeId , mentorId);
        if(!chat){
           chat = await chatRepository.createChat(menteeId , mentorId);
        }

        return chat;
    }
}