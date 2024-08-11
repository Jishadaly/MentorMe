// types/feedback.ts
import { Types } from 'mongoose';

export interface IFeedback {
  sessionId: Types.ObjectId;
  mentorId: Types.ObjectId;
  menteeId: Types.ObjectId;
  rating: number;
  comments: string;
  createdAt?: Date;
}
