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
  }
  
}