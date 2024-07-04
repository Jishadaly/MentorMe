import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
  userId?: string;
}
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
    req.userId = decoded.userId; // Assuming your JWT payload has a userId field
    console.log("token verified succesfully");
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default verifyToken;