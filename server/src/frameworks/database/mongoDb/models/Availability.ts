import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for Availability
export interface IAvailability extends Document {
  mentorId: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

// Mongoose schema for Availability
const AvailabilitySchema: Schema = new Schema({
  mentorId: { type: Schema.Types.ObjectId, ref: 'MentorApplication', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

const Availability = mongoose.model<IAvailability>('Availability', AvailabilitySchema);
export default Availability;