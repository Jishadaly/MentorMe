import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    otp?: string;
    otpGeneratedAt?: number;
  }
}

declare module 'express' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}
