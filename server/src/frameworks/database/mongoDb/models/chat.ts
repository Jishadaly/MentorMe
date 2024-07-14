import mongoose,{Document,Schema} from "mongoose";
import { Iuser } from "./user";

export interface chatDocument extends Document{
    chatName:string;
    users:Iuser[];
    latestMessage:Schema.Types.ObjectId;    
}

const chatSchema:Schema<chatDocument> = new Schema(
    {
        chatName:{
            type:String,
            trim:true
        },
        users:[{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }],
        latestMessage:{
            type:mongoose.Schema.ObjectId,
            ref:'Message'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        },

    },{
        timestamps:true
    }
)

const Chat = mongoose.model('Chat',chatSchema)
export default Chat;