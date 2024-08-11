import mongoose, { Document, Schema, model } from 'mongoose';

interface IReport extends Document {
  blogId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  reason: string;
  additionalDetails?: string;
  createdAt: Date;
}

const reportSchema = new Schema<IReport>({
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  reason: { type: String, required: true },
  additionalDetails: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Report = model<IReport>('Report', reportSchema);

export default Report;