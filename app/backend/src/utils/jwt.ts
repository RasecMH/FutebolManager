import { sign, verify } from 'jsonwebtoken';
import { JwtPayloadInterface } from '../interfaces/JwtPayload';
import HttpError from './httpError';
import { User } from './interfaces';

const jwtSecret = process.env.JWT_SECRET || 'JWT_SECRET';

export const createToken = async (payload: Omit<User, 'username' | 'email' | 'password'>) =>
  sign(payload, jwtSecret as string, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

export const validateToken = async (token: string) => {
  try {
    const payload = verify(token, jwtSecret as string) as JwtPayloadInterface;
    return payload;
  } catch (error) {
    throw new HttpError(401, 'Token must be a valid token');
  }
};
