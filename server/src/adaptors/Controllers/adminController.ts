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
      
      const {userData} = req.body;
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
  },

  getAllUsers:async(req:Request ,res:Response , next:NextFunction)=>{
    try {
      const users = await adminInteractor.getAllUsers()
      res.status(200).json({message: "mentor data fetched  successfully",users})
    } catch (error) {
      res.status(500).json({error: error})
    }
  },

  getAllMentors:async(req:Request ,res:Response , next:NextFunction)=>{
    try {
      const Mentors = await adminInteractor.getAllMentors()
      res.status(200).json({message: "mentor data fetched  successfully",Mentors})
    } catch (error) {
      res.status(500).json({error: error})
    }
  },

  updateBlockStatus:async(req:Request ,res:Response , next:NextFunction)=>{
    try {
      console.log(req.query);
      const { userId  , isBlocked } = req.query;
      const id = userId as string;
      const blocked = isBlocked as any;
      console.log(blocked);
      
      const response = await adminInteractor.updateBlockStatus(id,blocked)
      // const Mentors = await adminInteractor.updateBlockStatus();
      res.status(200).json({message: "user blocked  successfully"});
    } catch (error) {
      res.status(500).json({error: error})
    }
  },

  fetchSlots:async(req:Request ,res:Response , next:NextFunction)=>{
    try {
      const slots = await adminInteractor.getSlots();
      res.status(200).json({message: "mentor data fetched  successfully",slots})
    } catch (error:any) {
      res.status(500).json(error.message);
    }
  },

}