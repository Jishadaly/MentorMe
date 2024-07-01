import mongoose, { Document, Schema } from 'mongoose';
import { ISlot  } from './slots';
// import Slots from './slots';


// Define the interface for MentorApplication.
interface IMentorApplication extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  email: string;
  bio: string;
  jobTitle: string;
  company?: string;
  location: string;
  programmingLanguages: string[];
  skills: string[];
  languagePreference: string[];
  linkedInProfile: string;
  motivation: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
  slots: ISlot[];
  availabilities: mongoose.Types.ObjectId[];
}


// Define the MentorApplication schema
const MentorApplicationSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  programmingLanguages: {
    type: [String],
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  languagePreference: {
    type: [String],
    required: true
  },
  linkedInProfile: {
    type: String,
    required: true
  },
  motivation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  slots: [{
    type: Schema.Types.ObjectId,
    ref: 'Slot'
  }],
  availabilities: [{ 
    type: Schema.Types.ObjectId,
     ref: 'Availability'
  }],
});

// Create and export the model
const MentorApplication = mongoose.model<IMentorApplication>('MentorApplication', MentorApplicationSchema);
export default MentorApplication;