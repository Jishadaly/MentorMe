import { Schema, model, Document, Model } from 'mongoose';

  type NotificationType = 'session_booking' | 'session_reminder' | 'new_message' | 'feedback_request';

    export interface INotification extends Document {
      userId: Schema.Types.ObjectId;
      type: NotificationType;
      title: string;
      description: string;
      timestamp: Date;
      read: boolean;
    }

    const notificationSchema = new Schema<INotification>({
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      type: {
        type: String,
        enum: ['session_booking', 'session_reminder', 'new_message', 'feedback_request'],
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
    }, {
      timestamps: true,
    });

const Notification: Model<INotification> = model<INotification>('Notification', notificationSchema);
export default Notification;