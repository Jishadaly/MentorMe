import { Request,Response,NextFunction } from "express";
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

  // createCheckoutSession:async(req:Request , res:Response , next:NextFunction)=>{
          
  //         try {
  //           const { price } = req.body;
  //           const paymentIntent = await stripe.paymentIntents.create({
  //             price, // amount is expected to be in the smallest currency unit (e.g., cents)
  //               currency: 'usd',
  //              automatic_payment_methods : {
  //                enabled : true 
  //              }
  //           });
 
  //           res.status(200).send({
  //               clientSecret: paymentIntent.client_secret, 
  //           });
  //       } catch (error:any) {
  //           res.status(400).send({ error: error.message });
  //       }


  // },

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
                name: '1 Hour slot', // Replace with your product name
                description: '1-hour consultation slot', // Optional description
                images: ['https://picsum.photos/200/300'], // Optional product image
              },
              unit_amount: price * 100, // Price in paisa (100 paisa = 1 INR)
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/mentee/home?session_id={CHECKOUT_SESSION_ID}`, // Replace with your client URL
        cancel_url: `${process.env.CLIENT_URL}/mentee/home`,
        
        locale: 'en', // Language/locale for Checkout page
        customer_email: 'customer@example.com', // Pre-fill customer email if known
      });


      res.json({ url : session.url })
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
  }
  

}