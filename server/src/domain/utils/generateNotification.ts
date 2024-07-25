import Notification from '../../frameworks/database/mongoDb/models/notification';
import { Types } from 'mongoose';

export async function generateNotification(data: { userId: string, type: string, title: string, description: string }) {
  try {
    const newNotification = new Notification({
      userId: new Types.ObjectId(data.userId),
      type: data.type,
      title: data.title,
      description: data.description,
      timestamp: new Date(),
      read: false
    });

    await newNotification.save();
    console.log('Notification saved successfully:', newNotification);
  } catch (error) {
    console.error('Error saving notification:', error);
  }
}
