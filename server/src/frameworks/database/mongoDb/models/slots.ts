import mongoose, { Document, Schema } from 'mongoose';

export interface ISlot {
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedBy?: mongoose.Types.ObjectId;
}

const SlotSchema: Schema = new Schema({
  date: { type: Date },
  startTime: { type: String },
  endTime: { type: String },
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: Schema.Types.ObjectId, ref: 'Mentee', default: null }
},);

const Slots = mongoose.model<ISlot>('Slots', SlotSchema)
export default Slots;