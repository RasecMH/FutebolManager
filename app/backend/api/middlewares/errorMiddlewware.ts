import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../utils/httpError';

const httpErrorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  // console.log('err', err);
  const { status, message } = err as HttpError;
  res.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};

export default httpErrorMiddleware;
