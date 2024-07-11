import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../domain/entities/types/AuthenticatedRequest';

const checkRole = (role: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.userRole === role || role === 'any') {
      next();
    }else{
      res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
   
  };
};

export default checkRole;
