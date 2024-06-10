import { Request,Response,NextFunction } from "express";
import mentorInteractor from "../../domain/usecases/mentorInteractor";

export default {
   
  mentorApplicationFormSub: async (req:Request , res:Response ,  next: NextFunction)=>{
     try {
       const  { userId , name , email , bio , jobTitle , company , location , programmingLanguages , skills ,  languagePreference ,linkedInProfile , motivation} = req.body;
        const user = userId;
        const datas = {
          user,
          name,
          email,
          bio,
          jobTitle,
          company,
          location,
          programmingLanguages,
          skills,
          languagePreference,
          linkedInProfile,
          motivation,
          createdAt: new Date()
        }
        const response = await mentorInteractor.mentorApplicationForm(datas);
        res.status(200).json({message:"your mentor request submited succecfully please wait for while"})
     } catch (error:any) {
      console.log(error);
      res.status(400).json({ error: error.message });
     }
  },

  getMentors:async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const mentors = await mentorInteractor.getMentors();
        res.status(200).json({message:"fetched succecfully" , mentors});
    } catch (error) {
      res.status(500).json(error)
    }
  }
}