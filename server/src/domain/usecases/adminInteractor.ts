import { findAdmin } from "../repositories/adminReposetory"


export default {
  adminLogger :async(cred:{email:string , password:string})=>{
      const admin = await findAdmin(cred.email);

      if (!admin) {
         throw new Error("user email not match")
      }

      if( cred.password !== admin.password ){
         throw new Error ("user enterd password is not matching")
      }

      return admin;
   }

   
}