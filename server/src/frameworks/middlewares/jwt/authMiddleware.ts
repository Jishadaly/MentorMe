import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { AuthenticatedRequest } from '../../../domain/entities/types/AuthenticatedRequest';

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT secret key is not defined');
}


  const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format' });
  }
  
  const token = tokenParts[1];
  try {
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    
    req.userId = decoded.userId; 
    req.userRole = decoded.userRole

    
    
    next();

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({ message: "token expired" });
  } else {
      res.status(401).json({ message: "Not authorized Invalid token" });
  }
  }
};

export default protect;