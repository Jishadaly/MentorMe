import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { AuthenticatedRequest } from '../../../domain/entities/types/AuthenticatedRequest';

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT secret key is not defined');
}


  const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
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
    console.log("decodeed",decoded);
    
    req.userId = decoded.userId; // Assuming your JWT payload has a userId field
    req.userRole = decoded.userRole

    console.log("auth middleware",req.userRole);
    
    console.log("token verified succesfully");
    
    next();
<<<<<<< HEAD
=======

>>>>>>> 6b1760b (role based authentication done)
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default verifyToken;