import { Request,Response,NextFunction,  } from "express";
import menteeInteractor from "../../domain/usecases/menteeInteractor";

declare module 'express-serve-static-core' {
  interface Request {
      userId?: string;
  }
}

export default {
  getMentee: async (req:Request , res:Response ,  next: NextFunction)=>{
      console.log(req.query);
      const userId  = req.userId;
      const menteeId = userId as string;
      
      try {
        const mentee = await menteeInteractor.getMentee(menteeId)
        console.log(mentee);
        
        res.status(200).json(mentee);
      } catch (error:any) {
        res.status(400).json(error.message);
      }
      
  },
  editProfile:async (req:Request , res:Response ,  next: NextFunction)=>{
    console.log(req.body);

    const { userId , fieldName , newValue} = req.body;
    const menteeId = userId as string;
    const updatingFeild = fieldName as string;
    const newVal = newValue as string;
    
    
    try {
      const updated = await menteeInteractor.editMenteeProfile(menteeId , updatingFeild , newVal );
      console.log(updated);
      res.status(200).json(updated);
    } catch (error:any) {
      res.status(400).json(error.message);
    }
    
},
postFeedback:async(req:Request , res:Response ,  next: NextFunction)=>{
  const { feedback , mentorId , sessionId , rating} :{ feedback:string ,  mentorId:string , sessionId:string , rating:string} = req.body;
  
  const userId =  req.userId as string;
  console.log("mentee");
  
  console.log(req.body);
  
  try {
    const feedBack = await menteeInteractor.postFeedback(userId , feedback , mentorId , sessionId , rating) ;
    res.status(200).json({message:"feedback posted "});
  } catch (error:any) {
    res.status(400).json(error.message);
  }

},

getMentorReviews:async(req:Request , res:Response ,  next: NextFunction)=>{
  const {mentorId} = req.query;
  try {
    const reviews = await menteeInteractor.getMentorReviews(mentorId as string) ;
    console.log(reviews);
    
    res.status(200).json(reviews);
  } catch (error:any) {
    res.status(400).json(error.message);
  }

},

searchMentor:async(req:Request , res:Response , next:NextFunction)=>{
  console.log(req.query);
  const query = req.query.search as string;

  try {
      const mentors = await menteeInteractor.searchMentors(query);
      res.status(200).json(mentors);
  } catch (error:any) {
      res.status(400).json(error.message);
  }
}

}