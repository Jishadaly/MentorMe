import { NextFunction , Request , Response } from "express";
import adminInteractor from "../../domain/usecases/adminInteractor";

export default {
  getVerificationMentors: async(req:Request , res:Response , next:NextFunction)=>{
      try {
        const datas = await adminInteractor.getMentorsforVerification();
       
        
        res.status(200).json({message:"data fetched succedully" , datas});
      } catch (error) {
        res.status(500).json({error})
      }
      next()
  },

  verifyRequest: async(req:Request ,res:Response , next:NextFunction)=>{
    try {
      console.log(req.body);
       const {userData} = req.body
       
      console.log("kmkm");
      const { applicationId , requestedMenterId } = userData
      const response = await adminInteractor.verifyMentorRequest(applicationId,requestedMenterId );
      if (!response) {
        throw new Error("no updation")
      }
      res.status(200).json({message: "mentor appliacation verifyed successfully"})
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  ,
  rejectRequest:async(req:Request ,res:Response , next:NextFunction)=>{
    try {
      const { applicationId , requestedMenterId } = req.body

      
      const response = await adminInteractor.rejectMentorRequest(applicationId,requestedMenterId)
      res.status(200).json({message: "mentor appliacation Rejected successfully"})
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
}
