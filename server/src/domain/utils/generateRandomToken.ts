import crypto from 'crypto';
import { promisify } from 'util';

// Function to generate a token and expiration time
export const generateRandomToken = async (): Promise<{ token: string; expires: number }> => {
    const randomBytes = promisify(crypto.randomBytes);
    const buffer = await randomBytes(32);
    const token = buffer.toString('hex');
    const expires = Date.now() + 3600000; // Token expires in 1 hour

    return { token, expires };
};
