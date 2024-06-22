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
    console.log("menrtor details",mentor);
    return mentor;

    // const objectId = new mongoose.Types.ObjectId(mentorId);
    // const mentor = await MentorApplication.aggregate([
    //   { $match: { _id: objectId } },
    //   {
    //     $lookup: {
    //       from: 'availabilities',
    //       localField: '_id',
    //       foreignField: 'mentorId',
    //       as: 'availabilities'
    //     }
    //   }
    // ])
    // console.log("kokokoko",mentor);
    
    // if(!mentor) throw new Error("mentor not fond");
    // return mentor
  },

  addSlotes: async (mentorId: string, slot: DateRange) => {

    console.log(mentorId);

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


}

