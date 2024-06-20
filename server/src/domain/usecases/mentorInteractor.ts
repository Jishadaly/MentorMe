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
      console.log(error);
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
      console.log("rerspnd usecase",response);
      
      return response
   } catch (error:any) {
     throw new Error(error)
   }
},
addSlotes:async(mentorId:string,slots:IDateRange[])=>{
      try {
      const response = await mentorRepository.addSlotes(mentorId,slots); // Adjusted to handle array of slots
      return response;
      } catch (error:any) {
         console.log(error);
         throw new Error(error)
         
      }
      
}
  
}