const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const SECRET_KEY =  process.env.JWT_SECRET;
export const generateToken = (user:string ,email:string ) => {
    return jwt.sign({user : user, email :email }, SECRET_KEY, {
        expiresIn: '1h'
    });
};

export const verifyToken = (token:string) => {
    return jwt.verify(token, SECRET_KEY);
};
