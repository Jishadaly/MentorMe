
import { IUser } from "../../entities/types/user";
import { Iuser } from "../../../frameworks/database/mongoDb/models/user";
import { createUser } from "../../repositories/userRepository";

export const registerUser =  async (userData:IUser):Promise<Iuser>=>{
    //logic
    return await createUser(userData)
}