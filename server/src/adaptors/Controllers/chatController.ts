import { Request,Response,NextFunction,  } from "express";
import chatInteractor from "../../domain/usecases/chatInteractor";

export default {
    startChat:async(req:Request , res:Response , next:NextFunction)=>{
        console.log(req.query);
        
        try{
         const { menteeId , mentorId , } = req.query;
         
         if (!menteeId && !mentorId) throw Error ("heeu");
         const mentee:any = menteeId
         const mentor:any = mentorId
         const chatId = await chatInteractor.startChat(mentee ,mentor );

         res.status(200).json(chatId)

        }catch(e:any){
            console.log(e);
            res.status(400).json(e.message);
            
        }
    }
}