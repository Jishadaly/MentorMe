import { ApplicationForm } from "../entities/mentorApplication";
import MentorApplication from "../../frameworks/database/mongoDb/models/mentorApplicationModel";
import { sameUser } from "./userRepository";
import { Users } from "../../frameworks/database/mongoDb/models/user";


export default {
  saveApplicationForm:async(formData:ApplicationForm)=>{
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
      })
      await newForm.save();
      return newForm;
    } catch (error) {
      throw error
    }
  },

getMentors:async()=>{
     return await MentorApplication.find({status:"Approved"});
  },
  getMentor:async(mentorId:string)=>{
    return await MentorApplication.findById(mentorId);
  }
}

