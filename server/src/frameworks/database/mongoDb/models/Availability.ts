import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for Availability
export interface IAvailability extends Document {
  mentorId: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedBy:mongoose.Types.ObjectId;
}

// Mongoose schema for Availability
const AvailabilitySchema: Schema = new Schema({
  mentorId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: Schema.Types.ObjectId, ref: 'Users' }
},
  {
  timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
  }
  
});

const Availability = mongoose.model<IAvailability>('Availability', AvailabilitySchema);
export default Availability;