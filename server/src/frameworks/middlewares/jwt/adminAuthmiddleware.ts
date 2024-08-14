import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { AuthenticatedRequest } from '../../../domain/entities/types/AuthenticatedRequest';

const secretKey = process.env.JWT_SECRET as string;
const protectAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log("////////",authHeader);
    
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
      req.userRole = decoded.userRole;
      
      if (req.userRole !== 'admin') {
        console.log(req.userRole);
        
        return res.status(403).json({ error: 'Access denied, admin only' });
      }
  
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(403).json({ message: "token expired" });
      } else {
        res.status(401).json({ message: "Not authorized Invalid token" });
      }
    }
  };
  
  export default protectAdmin;
  