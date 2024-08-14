import { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express'; import bodyParser from 'express';
import { connectToDb } from "./dbConfig";
import session from 'express-session';
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOption = {
   origin: process.env.CLIENT_URL, 
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true, // Enable credentials
   exposedHeaders: ['x-auth-token']
};

declare module 'express-session' {
   interface SessionData {
       otp?: string;
       otpGeneratedAt?: number;
       email: string;
   }
}

export function configureExpress(app: Application): void {
   app.use(bodyParser.json());
   app.use(cookieParser());
   app.use(bodyParser.urlencoded({ extended: true }))
   app.use(cors(corsOption));
   app.use(session({
      secret: 'your-secret-key', // Replace with a strong, randomly generated secret key
      resave: false,
      saveUninitialized: true,
      cookie: { 
          secure: process.env.NODE_ENV === 'production', // Secure cookies in production
          httpOnly: true, // Helps prevent cross-site scripting (XSS) attacks
          maxAge: 24 * 60 * 60 * 1000 // Cookie expiration time in milliseconds (1 day here)
      }
  }));
  
   const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ error: err.message });
   };

   app.use(errorHandler);
   connectToDb();
}


