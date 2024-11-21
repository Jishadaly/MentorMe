import Availability from '../frameworks/database/mongoDb/models/Availability';

export async function deleteOldUnbookedSlots() {
  try {
    const now = new Date();
    const result = await Availability.deleteMany({ date: { $lt: now }, isBooked: false });
  } catch (error) {
    console.error('Error deleting old unbooked slots:', error);
  }
}