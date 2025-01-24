import { Schema, model, Document, Types } from 'mongoose';


interface IResetToken extends Document {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}


const resetTokenSchema = new Schema<IResetToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',        
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const ResetToken = model<IResetToken>('ResetToken', resetTokenSchema);

export default ResetToken;
