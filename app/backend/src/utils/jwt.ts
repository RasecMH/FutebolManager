import { sign, verify, JwtPayload } from 'jsonwebtoken';
import HttpError from './httpError';
import { User } from './interfaces';

export const createToken = async (payload: Omit<User, 'username' | 'email' | 'password'>) =>
  sign(payload, 'MinhaSenhaSecreta', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

export const validateToken = async (token: string | undefined) => {
  if (!token) throw new HttpError(401, 'Token not found');

  try {
    const id = verify(token, 'MinhaSenhaSecreta');
    return id as JwtPayload;
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(401, 'Token must be a valid token');
    }
  }
};
