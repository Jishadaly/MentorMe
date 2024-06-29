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
      console.log(error);
      res.status(500).json(error);
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
          
     const {price} = req.body; 
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: '1 Hour slot', 
                description: '1-hour consultation slot', 
              },
              unit_amount: price * 100, 
            },
            quantity: 1,
          },
        ],

        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/mentee/calles`, 
        cancel_url: `${process.env.CLIENT_URL}/mentee/home`,
        locale: 'en', 
        customer_email: 'customer@example.com',

      });

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
      res.status(400).json(error)
     }
  },

  webhook:async(req:Request , res:Response , next:NextFunction)=>{
    const sig = req.headers['stripe-signature'];
    let event;

      try {
         event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err:any) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

   
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log("payment success");
      break;
    default:
      return res.status(400).end();
  }
  // Return a 200 response to acknowledge receipt of the event
   res.json({received: true});
 }
}