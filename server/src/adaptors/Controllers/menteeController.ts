import { Request,Response,NextFunction,  } from "express";
import menteeInteractor from "../../domain/usecases/menteeInteractor";

export default {
  getMentee: async (req:Request , res:Response ,  next: NextFunction)=>{
      console.log(req.query);
      const { userId } = req.query;
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
}