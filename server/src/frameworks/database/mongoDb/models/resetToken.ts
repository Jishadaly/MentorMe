import { Schema, model, Document, Types } from 'mongoose';

// Define the interface for the ResetToken document
interface IResetToken extends Document {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}

// Create the schema
const resetTokenSchema = new Schema<IResetToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',         // Reference to the User model
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

// Create the model
const ResetToken = model<IResetToken>('ResetToken', resetTokenSchema);

export default ResetToken;
