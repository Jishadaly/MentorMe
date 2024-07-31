import { ApplicationForm } from "../entities/mentorApplication";
import MentorApplication from "../../frameworks/database/mongoDb/models/mentorApplicationModel";
import Availability from "../../frameworks/database/mongoDb/models/Availability";
import { Users } from "../../frameworks/database/mongoDb/models/user";
import { checkExistingUser } from "./userRepository";
import Notification from "../../frameworks/database/mongoDb/models/notification";


interface DateRange {
  from: Date | string;
  to: Date | string;
}


export default {
  saveApplicationForm: async (formData: ApplicationForm) => {
    try {

      
      const newForm = new MentorApplication({
        ...formData
      });
      const savedForm = await newForm.save();
      return newForm;

    } catch (error: any) {
      throw new Error(error);
    }
  },
  
  updateMentorData: async (formData: ApplicationForm, userId: string) => {
      try {
        console.log("///",formData);
        
        if (!formData.name || !formData.phone) throw Error('user or phone not there')
          const userName: string = formData.name
        const phone: string = String(formData.phone);
          const existingUser = await checkExistingUser('null', userName);
          if (existingUser) throw new Error('Entered name already exists. Try another one.');
      
          const user = await Users.findByIdAndUpdate(userId, { userName, phone }, { new: true });
          if (!user) throw new Error('User not found');
      
          const mentorData = {
            user: userId,
            name: userName,
            ...formData
          };
      
          let mentorApplication = await MentorApplication.findOne({ user: userId });
          if (mentorApplication) {
            mentorApplication = Object.assign(mentorApplication, mentorData);
          } else {
            mentorApplication = new MentorApplication(mentorData);
          }
      
          // Save both user and mentor application
          await mentorApplication.save();
          await user.save();

          return user.userName;
        } catch (error:any) {
          console.log(error);
          
        throw error
      }
   
  },

  getMentors: async () => {
    const mentors = await Users.find({ isMentor: true }).populate('mentorAdditional');
    return mentors

  },

  getMentor: async (mentorId: string) => {
    const mentor = await MentorApplication.findById(mentorId).populate('availabilities').populate({
      path: 'user',
      select: 'profilePic'
    })
    return mentor;
  },

  findExistingSlot: async (mentorId: string, slot: DateRange) => {
    try {
      const from = new Date(slot.from);
      const to = new Date(slot.to);

      // Check if the starting time is less than the ending time and the duration is one hour
      if (from >= to) {
        throw new Error('The start time must be less than the end time.');
      }

      const duration = (to.getTime() - from.getTime()) / (1000 * 60 * 60); // duration in hours
      if (duration !== 1) {
        throw new Error('The slot duration must be exactly one hour.');
      }

      // Check if there is any slot that overlaps with the given time range
      const existingSlot = await Availability.findOne({
        mentorId: mentorId,
        $or: [
          // Case where the new slot exactly matches an existing slot
          {
            startTime: from.toISOString(),
            endTime: to.toISOString()
          },
          // Case where the new slot's start time falls within an existing slot
          {
            $and: [
              { startTime: { $lte: from.toISOString() } },
              { endTime: { $gt: from.toISOString() } }
            ]
          },
          // Case where the new slot's end time falls within an existing slot
          {
            $and: [
              { startTime: { $lt: to.toISOString() } },
              { endTime: { $gte: to.toISOString() } }
            ]
          },
          // Case where the new slot entirely falls within an existing slot
          {
            $and: [
              { startTime: { $gte: from.toISOString() } },
              { startTime: { $lt: to.toISOString() } }
            ]
          },
          // Case where an existing slot entirely falls within the new slot
          {
            $and: [
              { endTime: { $gt: from.toISOString() } },
              { endTime: { $lte: to.toISOString() } }
            ]
          }
        ]
      });

      return existingSlot;
    } catch (error: any) {
      console.error('Error finding existing slot:', error);
      throw new Error(error.message);
    }
  },

  addSlotes: async (mentorId: string, slot: DateRange) => {

    try {
      const from = new Date(slot.from)
      const to = new Date(slot.to)

      const availabilities = {
        mentorId,
        date: from,
        startTime: from.toISOString(),
        endTime: to.toISOString(),
        isBooked: false
      };

      const createdAvailabilities = await Availability.create(availabilities);
      await MentorApplication.findOneAndUpdate(
        { user: mentorId },
        { $push: { availabilities: createdAvailabilities._id } }
      );

      return createdAvailabilities;

    } catch (error: any) {
      console.error('Error adding slots:', error);
      throw new Error(error.message);
    }
  },

  slotIdbooked: async (slotId: string) => {
    try {
      const isbooked = await Availability.findOne({ _id: slotId, isBooked: true });
      return isbooked
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  deleteSlot: async (slotId: string) => {
    try {

      const deletedSlot = await Availability.findByIdAndDelete(slotId);
      if (!deletedSlot) {
        throw new Error('Slot not found');
      }
      console.log(deletedSlot);

      return deletedSlot;
    } catch (error) {
      throw error
    }
  }
  ,

  getMentorApplication: async (mentorId: string) => {
    const mentorApplication = await MentorApplication.findOne({ user: mentorId }).populate('availabilities');
    if (!mentorApplication) throw new Error("there is no mentor application")
    const availableSlots = await Availability.find({ mentorId: mentorApplication.user });
    return availableSlots;
  },

  bookAslot: async (menteeId: string, mentorId: string, slotId: string) => {
    try {
      console.log("222222 ", mentorId, menteeId, slotId);

      const mentorApplicationId = await MentorApplication.findOne({ user: mentorId })
      console.log(mentorApplicationId);

      const bookAslot = await Availability.findByIdAndUpdate(slotId, { mentorId, isBooked: true, bookedBy: menteeId }, { new: true }).populate({path:'bookedBy mentorId' , select:'userName -_id' })
      return bookAslot

    } catch (error: any) {
      console.error('Error booking slots:', error);
      throw new Error(error.message);
    }
  },

  getMentorDetails: async (mentorId: string) => {
    try {
      const mentorDetails = await Users.findById(mentorId).select('-password').populate({ path: "mentorAdditional" });
      console.log(mentorDetails);

      return mentorDetails;
    } catch (error: any) {
      console.error('Error booking slots:', error);
      throw new Error(error.message);
    }
  },
  getSessions:async(mentorId:string)=>{
    try {
      const sessions = await Availability.find({mentorId:mentorId , isBooked:true}).populate({path:"bookedBy" , select:"userName -_id profilePic"})
      return sessions
    } catch (error) {
      throw error
    }
  },
  getNotifications:async(userId:string)=>{
    const notifications = await Notification.find({userId:userId , read:false})
    return notifications;
 },
 markAsReadNotification:async(notifyid:string)=>{
  const msrkRead = await Notification.findByIdAndUpdate(notifyid, { read:true ,  select:'_id'})

  return msrkRead
 }
}