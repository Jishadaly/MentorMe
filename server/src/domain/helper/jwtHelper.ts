const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const SECRET_KEY =  process.env.JWT_SECRET;

export const generateToken = (user:string ,email:string , role:string ) => {
   const  accessToken =  jwt.sign({userId : user, email :email , userRole:role }, SECRET_KEY, {
        expiresIn: '1m'
    });

    const  refreshToken =  jwt.sign({userId : user, email :email , userRole:role }, SECRET_KEY, {
        expiresIn: '1h'
    });

    return { accessToken , refreshToken };
};

export const verifyToken = (token:string) => {
    return jwt.verify(token, SECRET_KEY);
};
