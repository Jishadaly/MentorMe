import { Request, Response, NextFunction } from "express"
import { registerUser } from "../../domain/usecases/user/userInteractor";
import { IUser } from "../../domain/entities/types/user";

//User ?
export const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const newUser = await registerUser(req.body)
      res.status(201).json({message: "creted User successfuly" , newUser})
   } catch (error) {
      
         res.status(400).json(error);
   }
}