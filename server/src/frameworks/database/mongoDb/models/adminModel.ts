import mongoose , {Document, Schema} from "mongoose";


export interface Iadmin extends Document{
   name :string;
   email:string;
   phone:string;
   password:string;
}

const adminShema = new Schema<Iadmin>({
   name:{
    type:String,
    required:true
   },
   email:{
     type:String,
     required:true
   },
   phone:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   }
});

export const Admins = mongoose.model<Iadmin>('Admin',adminShema);