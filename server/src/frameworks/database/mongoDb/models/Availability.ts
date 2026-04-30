// import mongoose, { Document, Schema } from 'mongoose';


// export interface IAvailability extends Document {
//   mentorId: mongoose.Types.ObjectId;
//   date: Date;
//   startTime: string;
//   endTime: string;
//   isBooked: boolean;
//   bookedBy: mongoose.Types.ObjectId;
//   roomId: string;
//   status: 'Pending' | 'Completed';
// }


// const AvailabilitySchema: Schema = new Schema({
//   mentorId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
//   date: { type: Date, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
//   isBooked: { type: Boolean, default: false },
//   bookedBy: { type: Schema.Types.ObjectId, ref: 'Users' },
//   roomId: { type: String },
//   status: { 
//     type: String, 
//     enum: ['Pending', 'Completed'], 
//     default: 'Pending' 
//   }
// },
//   {
//     timestamps: {
//       createdAt: 'created_at',
//       updatedAt: 'updated_at',
//     }

//   });
  
// const Availability = mongoose.model<IAvailability>('Availability', AvailabilitySchema);
// export default Availability;


// ============================================
// 1. UPDATED MODEL - Add pricing and configuration
// ============================================
import mongoose, { Document, Schema } from 'mongoose';

export interface IAvailability extends Document {
  mentorId: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  price: number;
  isBooked: boolean;
  bookedBy?: mongoose.Types.ObjectId;
  roomId?: string;
  status: 'Available' | 'Booked' | 'Completed' | 'Cancelled';
}

const AvailabilitySchema: Schema = new Schema({
  mentorId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: Number, required: true, default: 60 }, // minutes
  price: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: Schema.Types.ObjectId, ref: 'Users' },
  roomId: { type: String },
  status: { 
    type: String, 
    enum: ['Available', 'Booked', 'Completed', 'Cancelled'], 
    default: 'Available' 
  }
}, {
  timestamps: true
});

// Index for efficient queries
AvailabilitySchema.index({ mentorId: 1, date: 1, startTime: 1 });
AvailabilitySchema.index({ mentorId: 1, isBooked: 1 });

const Availability = mongoose.model<IAvailability>('Availability', AvailabilitySchema);
export default Availability;

