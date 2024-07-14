import Chat from "../../frameworks/database/mongoDb/models/chat"


export default {
    getChat:async(menteeId:string , mentorId:string)=>{
        try {
            const chat = await Chat.findOne({
                users:  { $all : [menteeId  , mentorId] }
            })

            return chat;
        } catch (error) {
            throw error        }
    },
    createChat:async(menteeId:string , mentorId:string)=>{
        try{
            const chat = new Chat({
                chatName: "Mentorship Chat",
                users: [menteeId, mentorId],
            });
            await chat.save();

            return chat
        }catch(error){
            throw error
        }
    }
}