import { Users, Iuser } from '../../frameworks/database/mongoDb/models/user';
import { IUser } from '../entities/types/user';

 export const createUser = async (userData : IUser): Promise<Iuser> => {
  const newUser = new Users(userData);
  return await newUser.save();
 }