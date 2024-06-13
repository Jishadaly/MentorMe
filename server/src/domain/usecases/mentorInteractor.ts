import { ApplicationForm } from "../entities/mentorApplication";
import mentorRepository from "../repositories/mentorRepository";

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
      return mentorId
   } catch (error:any) {
     throw new Error(error)
   }
}
  
}