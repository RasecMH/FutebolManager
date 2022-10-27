import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwt';
import HttpError from '../utils/httpError';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }

    const payload = await validateToken(token);
    req.body.role = payload?.role;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
