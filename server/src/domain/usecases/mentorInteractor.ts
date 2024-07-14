import { Date } from "mongoose";
import { ApplicationForm } from "../entities/mentorApplication";
import mentorRepository from "../repositories/mentorRepository";
import { IDateRange } from "../entities/dateRange";
import { getBookdslotdb, sameUser } from "../repositories/userRepository";

export default {
  mentorApplicationForm: async(formData:ApplicationForm)=>{
     try {
        const savedData = await mentorRepository.saveApplicationForm(formData);
        return savedData;
     } catch (error) {
      throw  error
     }
  },

  getMentors:async()=>{
       try {
          const response = await mentorRepository.getMentors();
          return response
       } catch (error:any) {
         throw new Error(error)
       }
  },

  getMentor:async(mentorId:string)=>{
   
   try {
      const response = await mentorRepository.getMentor(mentorId);
      return response
   } catch (error:any) {
     throw new Error(error);
   }
},

addSlotes:async(mentorId:string,slot:IDateRange)=>{
      try {
         const duplicateSlot = await mentorRepository.findExistingSlot(mentorId, slot);

         if (duplicateSlot) {
           throw new Error("A slot already exists within the given time period.");
         }
          
           const currentDateTime = new Date();
           const from = new Date(slot.from);
           const to = new Date(slot.to);
   
           // Check if slot is in the past
           if (from < currentDateTime || to < currentDateTime) {
             throw new Error("Cannot add slots in the past.");
           }

      const response = await mentorRepository.addSlotes(mentorId,slot); // Adjusted to handle array of slots

      return response;
      } catch (error:any) {
         throw error
         
      }
},

deleteSlot:async(slotId:string)=>{
   try {
      const isbooked = await mentorRepository.slotIdbooked(slotId);
      if (isbooked) {
         throw new Error("slot already booked ");
      }
      const response = await mentorRepository.deleteSlot(slotId)
      return response
   } catch (error) {
      throw error
   }
},

getMentorApplication:async(mentorId:string)=>{
   try {
      const response = await mentorRepository.getMentorApplication(mentorId);
      return response
   } catch (error:any) {
     throw new Error(error)
   }
},

slotBooking:async(menteeId :string , mentorId:string ,slotId:string)=>{
   try {
      console.log("11111",menteeId , mentorId,slotId);
      
      const response = await mentorRepository.bookAslot(menteeId , mentorId ,slotId);
      return response
   } catch (error:any) {
     throw new Error(error)
   }
},

createPaymentIntent:async(mentee:string , mentor:string , slotId:string , price:number , stripe:any )=>{

   const user  = await sameUser(mentee);
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
        customer_email: user?.email,
        metadata: {
          mentee:mentee,
          mentor:mentor,
          slotId:slotId
        },
      });

      console.log("Checkout session created with metadata:", session.metadata);

      return session
      
   } catch (error:any) {
      console.log({error});
      throw new Error(error)
   }
},
getBookedSlotes:async(userId:string)=>{
   const slotes = await  getBookdslotdb(userId);
   return slotes;
}
  
}