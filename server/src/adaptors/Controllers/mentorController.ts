import { Request,Response,NextFunction,  } from "express";
import mentorInteractor from "../../domain/usecases/mentorInteractor";
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);

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
      
      
      if (!mentorId) throw new Error("mentor id id not there");
      const mentorIdString = mentorId as string;
      const mentor = await mentorInteractor.getMentor(mentorIdString);
      res.status(200).json({message:"fetched a mentor succecfully" , mentor});
    } catch (error) {
      res.status(500).json(error)
    }
  },


  addSlots:async(req:Request, res:Response , next:NextFunction)=>{
    console.log(req.body);
    try {
       const { mentorId , slot } = req.body
       const addedSlots = await mentorInteractor.addSlotes(mentorId,slot);
       res.status(200).json({message:"slote added successfully",addedSlots});
    } catch (error:any) {
      console.log("errrrrrerrer",error);
      res.status(400).json(error.message)
    }
  },

  getApplicationId:async(req:Request , res:Response , next:NextFunction)=>{
    try {

      const { mentorId } = req.query
      const mentorIdString = mentorId as string
      const response = await mentorInteractor.getMentorApplication(mentorIdString)
      res.status(200).json({message:"mentor data fetched successfuly" , response})

    } catch (error:any) {
      res.status(400).status(error)
    }
  },

  slotBooking:async(req:Request , res:Response , next:NextFunction)=>{
    try {

      const {menteeId , mentorId ,slotId }  = req.body
      // const slot = await mentorInteractor.slotBooking(menteeId , mentorId ,slotId );
      res.status(200).json(await mentorInteractor.slotBooking(menteeId , mentorId ,slotId ));
    } catch (error:any) {
      res.status(400).status(error)
    }
  },

  createCheckoutSession:async(req:Request , res:Response , next:NextFunction)=>{
          
     const  { mentee , mentor , slotId , price } = req.body; 
     console.log(mentee , mentor , slotId , price);

    try {
      const session = await mentorInteractor.createPaymentIntent(mentee , mentor , slotId , price , stripe)
      res.json({ url : session.url });

  } catch (error:any) {
      console.log(error);
      
      res.status(500).send({ error: error.message });
  }


},

  deleteSlot:async(req:Request , res:Response, next: NextFunction)=>{
        const { slotId } = req.query; 
    try {
        if(!slotId) throw new Error("slot id is undefined")
        const slotID = slotId as string;
        const deletedSlot = await mentorInteractor.deleteSlot(slotID)
        console.log(deletedSlot);
        
        res.status(200).json({message:"slot deleted succefully", deletedSlot})
     } catch (error:any) {
      res.status(400).json(error.message)
     }
  },

  webhook:async(req:Request , res:Response , next:NextFunction)=>{
    console.log("arraived");
    
    // const sig = req.headers['stripe-signature'];
    // let event;

    //   try {
    //      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    //      console.log("11111",{event});
         
    //   } catch (err:any) {
    //     console.log({err});
    //     // return res.status(400).send(`Webhook Error: ${err.message}`);
    //   }
    //   console.log("22222",{event,type:event?.type});
     const event = req.body
  switch (event.type) {
      case 'checkout.session.completed':
        const metaData = event?.data?.object?.metadata;
        const { slotId , mentee , mentor } = metaData;
        console.log(metaData);
        
        const bookedSlot = await mentorInteractor.slotBooking( mentee , mentor , slotId)
        console.log("payment session complete with booked id ",bookedSlot);
      break;
    default:
      return res.status(400).end();
  }
   res.status(200).json({received: true});
 },

 getBookedSlotes:async(req:Request , res:Response , next:NextFunction)=>{
   try { 
     const  userId : any  = req.query.userId
     console.log(userId);
     const slotes = await mentorInteractor.getBookedSlotes(userId)
     res.status(200).json({slotes})
   } catch (error) {
    res.status(500).json({error:error}) 
   }
 }
}