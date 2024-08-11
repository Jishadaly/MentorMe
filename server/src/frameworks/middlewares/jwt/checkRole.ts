import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../domain/entities/types/AuthenticatedRequest';

const checkRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.userRole;
    if (userRole && roles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
  };
};

export default checkRole;
