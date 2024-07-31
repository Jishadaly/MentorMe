import mongoose, { Document, Schema, mongo } from "mongoose";

export interface messageDocument extends Document {
    sender: mongoose.Types.ObjectId;
    content: string;
    chat: mongoose.Types.ObjectId;
    isRead:boolean;
    imageUrl:string;
}

const messageSchema: Schema<messageDocument> = new Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
    },
    isRead:{
        type:Boolean,
        default:false
    },
    imageUrl:{
        type:String
    },
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

export default Message;