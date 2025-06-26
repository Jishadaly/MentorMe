import { Request, Response, NextFunction, } from "express";
import mentorInteractor from "../../domain/usecases/mentorInteractor";
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);

declare module 'express-serve-static-core' {
  interface Request {
      userId?: string;
  }
}

export default {

  mentorApplicationFormSub: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { userId, name, email, bio, jobTitle, company, location, programmingLanguages, skills, languagePreference, linkedInProfile, motivation } = req.body;
      const user = req.userId;
      const datas = {
        ...req.body,
        createdAt: new Date()
      }
      await mentorInteractor.mentorApplicationForm(datas);
      res.status(200).json({ message: "your mentor request submited succecfully please wait for while" })
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },

  getMentors: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mentors = await mentorInteractor.getMentors();
      res.status(200).json({ message: "fetched succecfully", mentors });
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getMentor: async (req: Request, res: Response, next: NextFunction) => {
    const { mentorId } = req.query
   
    try {
     
      if (!mentorId) throw new Error("mentor id id not there");
      const mentorIdString = mentorId as string;
      const mentor = await mentorInteractor.getMentor(mentorIdString);
     
      
      res.status(200).json({ message: "fetched a mentor succecfully", mentor });
    } catch (error) {
      console.log({error});
      
      res.status(500).json(error)
    }
  },

  addSlots: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      const { mentorId, slot } = req.body
      const addedSlots = await mentorInteractor.addSlotes(mentorId, slot);
      res.status(200).json({ message: "slote added successfully", addedSlots });
    } catch (error: any) {
      console.log("errrrrrerrer", error);
      res.status(400).json(error.message)
    }
  },

  getApplicationId: async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { mentorId } = req.query
      const mentorIdString = mentorId as string
      const response = await mentorInteractor.getMentorApplication(mentorIdString)
      res.status(200).json({ message: "mentor data fetched successfuly", response })

    } catch (error: any) {
      res.status(400).status(error)
    }
  },

  slotBooking: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("sloototot");

      const { menteeId, mentorId, slotId } = req.body
      // const slot = await mentorInteractor.slotBooking(menteeId , mentorId ,slotId );
      
      res.status(200).json(await mentorInteractor.slotBooking(menteeId, mentorId, slotId));
    } catch (error: any) {
      res.status(400).status(error)
    }
  },

  createCheckoutSession: async (req: Request, res: Response, next: NextFunction) => {

    const { mentee, mentor, slotId, price } = req.body;
    console.log(mentee, mentor, slotId, price);

    try {
      const session = await mentorInteractor.createPaymentIntent(mentee, mentor, slotId, price, stripe)
      res.json({ url: session.url });

    } catch (error: any) {
      console.log(error);

      res.status(500).send({ error: error.message });
    }


  },

  deleteSlot: async (req: Request, res: Response, next: NextFunction) => {
    const { slotId } = req.query;
    try {
      if (!slotId) throw new Error("slot id is undefined")
      const slotID = slotId as string;
      const deletedSlot = await mentorInteractor.deleteSlot(slotID)
      console.log(deletedSlot);

      res.status(200).json({ message: "slot deleted succefully", deletedSlot })
    } catch (error: any) {
      res.status(400).json(error.message)
    }
  },

  webhook: async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body;
    
    switch (event.type) {
      case 'checkout.session.completed':
        const metaData = event?.data?.object?.metadata;
        const { slotId, mentee, mentor } = metaData;
        const bookedSlot = await mentorInteractor.slotBooking(mentee, mentor, slotId)
        console.log("payment session complete with booked id ", bookedSlot);
        break;
      default:
        return res.status(400).end();
    }
    res.status(200).json({ received: true });
  },

  getBookedSlotes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: any = req.query.userId
      console.log(userId);
      const slotes = await mentorInteractor.getBookedSlotes(userId)
      res.status(200).json({ slotes })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  },
  getMentorDetails: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query);
      const userId: any = req.query.userId;
      console.log(userId);
      const metor = await mentorInteractor.getMentorDetails(userId)
      res.status(200).json(metor)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  },

  updateMentorProfile:async(req:Request , res:Response ,next:NextFunction)=>{
    try {

      const {  userName,phone, bio, jobTitle, company, location, programmingLanguages, skills, languagePreference, linkedInProfile, motivation } = req.body;
      
      const datas = {
        name:userName,
        phone,
        bio,
        jobTitle,
        company,
        location,
        programmingLanguages,
        skills,
        languagePreference,
        linkedInProfile,
        motivation,
        updatedAt: new Date()
      }

      const userId = req.userId;
       console.log(userId);
       console.log(datas);
       if (!userId) throw Error('no user')
       const response = await mentorInteractor.updateMentor(datas , userId);

       res.status(200).json({message:'updated',response});
    } catch (error:any) {
      res.status(400).json(error.message)
    }
  },
  getMentorSessions:async(req:Request , res:Response , next:NextFunction)=>{
    try {
      const mentorId = req.userId;
      if(!mentorId) throw Error('user not authorised');
      const sessions = await mentorInteractor.getSessions(mentorId);
      res.status(200).json(sessions)
    } catch (error:any) {
       res.status(400).json(error.message)
    }
  },

  getNotifications:async(req:Request , res:Response , next:NextFunction)=>{
    try {
      const userId = req.userId as string;
      const response = await mentorInteractor.getNotifications(userId);
      console.log(response);
      
      res.status(200).json(response);
    } catch (error:any) {
      res.status(400).json(error.message);
    }
  },
  
  editNotification:async(req:Request , res:Response, next:NextFunction)=>{
     try {
       
       const notificationId  = req.query.notificationId as string
       console.log(notificationId);
       const id = await mentorInteractor.editNotification(notificationId)
       console.log("succs",id);
       res.status(200).json(id);
     } catch (error:any) {
      res.status(400).json(error.message)
     }
  },

  updateSessionStatus:async(req:Request , res:Response, next:NextFunction)=>{
    console.log(req.query);
    try {
      
      const {status ,  id }  = req.query
     
      const response = await mentorInteractor.updateStatus( id  as string, status as string);
      console.log("succs",response);
      res.status(200).json(response);
    } catch (error:any) {
     res.status(400).json(error.message)
    }
  },

  getMentorDashboard:async(req:Request ,  res:Response , next:NextFunction)=>{
    
    try {
      const userId = req.userId as string
      const datas = await mentorInteractor.getDashboardStatus(userId);
      res.status(200).json(datas)
    } catch (error:any) {
      console.log(error);
      res.status(400).json(error.message)
    }
  }
}