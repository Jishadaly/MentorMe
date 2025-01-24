import { Document, Schema, Model, model } from 'mongoose';
import { IFeedback } from '../../../domain/entities/types/user/feedback';

interface IFeedbackDocument extends IFeedback, Document {}

const feedbackSchema: Schema<IFeedbackDocument> = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: 'Availability', required: true },
  mentorId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  menteeId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback: Model<IFeedbackDocument> = model<IFeedbackDocument>('Feedback', feedbackSchema);

export default Feedback;