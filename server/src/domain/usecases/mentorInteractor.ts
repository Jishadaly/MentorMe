import { Date } from "mongoose";
import { ApplicationForm } from "../entities/mentorApplication";
import mentorRepository from "../repositories/mentorRepository";
import { IDateRange } from "../entities/dateRange";

export default {
  mentorApplicationForm: async(formData:ApplicationForm)=>{
     try {
        const savedData = await mentorRepository.saveApplicationForm(formData);
        return savedData;
     } catch (error) {
      throw  error
     }
  },

  getMentors:async()=>{
       try {
          const response = await mentorRepository.getMentors();
          return response
       } catch (error:any) {
         throw new Error(error)
       }
  },

  getMentor:async(mentorId:string)=>{
   console.log(mentorId);
   
   try {
      const response = await mentorRepository.getMentor(mentorId);
      return response
   } catch (error:any) {
     throw new Error(error)
   }
},
addSlotes:async(mentorId:string,slot:IDateRange)=>{
   
      try {
         const currentDateTime = new Date();
         
           const from = new Date(slot.from);
           const to = new Date(slot.to);
   
           // Check if slot is in the past
           if (from < currentDateTime || to < currentDateTime) {
             throw new Error("Cannot add slots in the past.");
           }


           
      const response = await mentorRepository.addSlotes(mentorId,slot); // Adjusted to handle array of slots

      return response;
      } catch (error:any) {
         throw new Error(error)
         
      }
      
},
getMentorApplication:async(mentorId:string)=>{
   console.log(mentorId);
   
   try {
      const response = await mentorRepository.getMentorApplication(mentorId);
      
      
      return response
   } catch (error:any) {
     throw new Error(error)
   }
},

slotBooking:async(menteeId :string , mentorId:string ,slotId:string)=>{
   try {
      const response = await mentorRepository.bookAslot(menteeId , mentorId ,slotId);
      return response
   } catch (error:any) {
     throw new Error(error)
   }
}
  
}