import { sign, verify } from 'jsonwebtoken';
import { JwtPayloadInterface } from '../interfaces/JwtPayload';
import HttpError from './httpError';
import { User } from './interfaces';

export const createToken = async (payload: Omit<User, 'username' | 'email' | 'password'>) =>
  sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

export const validateToken = async (token: string) => {
  if (!token) throw new HttpError(401, 'Token not found');

  try {
    const payload = verify(token, process.env.JWT_SECRET as string) as JwtPayloadInterface;
    return payload.role;
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(401, 'Token must be a valid token');
    }
  }
};
