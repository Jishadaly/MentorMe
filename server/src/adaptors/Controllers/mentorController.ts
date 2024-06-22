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
  },
  getMentor:async(req:Request , res:Response , next:NextFunction)=>{
    try {
      const  { mentorId } = req.query
      console.log(mentorId);
      
      if (!mentorId) throw new Error("mentor id id not there");
      const mentorIdString = mentorId as string;
      const mentor = await mentorInteractor.getMentor(mentorIdString);
      res.status(200).json({message:"fetched a mentor succecfully" , mentor});
      
    } catch (error) {
      res.status(500).json(error)
    }
  },
  addSlots:async(req:Request, res:Response , next:NextFunction)=>{
    try {
      const { mentorId , slots } = req.body
      console.log("controller",req.body);
      
       const response = await mentorInteractor.addSlotes(mentorId,slots);
       res.status(200).json({message:"slote added successfully"});
    } catch (error:any) {
      console.log(error);
      
      res.status(400).json({ message: error.message });
    }
  }

}