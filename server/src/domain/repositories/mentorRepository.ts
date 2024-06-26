import { ApplicationForm } from "../entities/mentorApplication";
import MentorApplication from "../../frameworks/database/mongoDb/models/mentorApplicationModel";
import { sameUser } from "./userRepository";
import { Users } from "../../frameworks/database/mongoDb/models/user";
import mentorController from "../../adaptors/Controllers/mentorController";
import mongoose from "mongoose";
import Availability from "../../frameworks/database/mongoDb/models/Availability";

interface DateRange {
  from: Date | string;
  to: Date | string;
}

export default {
  saveApplicationForm: async (formData: ApplicationForm) => {
    try {

      // if (formData.user) {
      //   const checkUser = await sameUser(formData.user);
      //   console.log(checkUser);

      //   if (checkUser) {
      //    throw new Error("user request is alredy pending")
      //   }
      // }

      const newForm = new MentorApplication({
        ...formData
      });

      await newForm.save();
      return newForm;

    } catch (error: any) {
      throw new Error(error);
    }
  },

  getMentors: async () => {

    return await MentorApplication.find({ status: "Approved" });

  },

  getMentor: async (mentorId: string) => {
    const mentor =  await MentorApplication.findById(mentorId).populate('availabilities');
    return mentor;
  },

  addSlotes: async (mentorId: string, slot: DateRange) => {
    // const mentorApplicationId = await MentorApplication.findById(mentorId)
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

  deleteSlot:async(slotId:string)=>{
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

  getMentorApplication:async (mentorId: string) => {
    const mentorApplication = await MentorApplication.findOne({user:mentorId}).populate('availabilities');

    if(!mentorApplication) throw new Error("there is no mentor application")
        const availableSlots = await Availability.find({ mentorId: mentorApplication.user });

      return availableSlots;
  },

  bookAslot:async(menteeId:string , mentorId:string ,slotId:string)=>{
      try{
        const bookAslot = await Availability.findByIdAndUpdate(slotId , {mentorId:mentorId , isBooked:true , bookedBy:menteeId})
        return bookAslot
        
      }catch(error:any){
        console.error('Error booking slots:', error);
      throw new Error(error.message);
      }
  }


}

