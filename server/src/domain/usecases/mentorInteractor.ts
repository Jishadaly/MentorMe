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
  }
}