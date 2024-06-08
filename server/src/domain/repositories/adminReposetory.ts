import { Admins } from "../../frameworks/database/mongoDb/models/adminModel"

export const findAdmin = async (email:string)=> await Admins.findOne({email})
