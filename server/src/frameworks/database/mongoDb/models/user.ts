  import mongoose , { Schema , model , Document } from "mongoose";


  export interface Iuser extends Document {
      userName:string;
      email:string;
      password:string;
      phone:string;
      currentType:string;
      currentStatus:string;
      education:string;
      interests:Array<string>;
      profilePic:string;
      isGoogleUser:boolean;
      isBlocked:boolean;
      verified:boolean;
      isMentee:boolean;
      isMentor:boolean;
      // Mentor-specific fields
      Languages:Array<string>;
      yearOfExperience:string;
      skills:Array<string>
      communicationPreference:Array<string>;
      company:string;
      availablity:string;
      mentorVerification:Boolean;
      linkedinURL:string;
      mentorAdditional:mongoose.Types.ObjectId;
      blogs: mongoose.Types.ObjectId[];
  } 


  const userSchema = new Schema<Iuser>({
    userName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },

    password: {
      type: String,
      required: function(this:Iuser){
        return !this.isGoogleUser;
      },
    },

    phone: {
      type: String,
      required: function(this: Iuser){
        return !this.isGoogleUser;
      },
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    
    interests: {
      type: [String],
    },

    currentType: {
      type: String,
    },

    currentStatus: {
      type: String,
    },

    education: {
      type: String,
    },

    profilePic: {
      type: String,
    },

    isGoogleUser: {
      type: Boolean,
      default:false
    },

    isBlocked: {
      type:Boolean,
      default:false
    },
    verified: {
      type:Boolean,
      default:false
    },
    isMentee: {
      type:Boolean,
      default:false
    },
    isMentor: {
      required:true,
      type:Boolean,
      default:false
    },
    mentorAdditional: {
      type: Schema.Types.ObjectId,
      ref: 'MentorApplication',
    },
    blogs: [{
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }]

  });

  export const Users = mongoose.model<Iuser>('Users' , userSchema );