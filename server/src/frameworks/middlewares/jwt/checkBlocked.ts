import { Request, Response, NextFunction } from 'express';
import { Users } from '../../database/mongoDb/models/user';
import { AuthenticatedRequest } from '../../../domain/entities/types/AuthenticatedRequest';

declare module 'express-serve-static-core' {
  interface Request {
      userId?: string;
  }
}

const checkBlocked = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const user = await Users.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Access denied: User is blocked' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default checkBlocked;