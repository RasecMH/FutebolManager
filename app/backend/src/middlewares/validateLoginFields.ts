import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/httpError';
import { loginSchema } from '../utils/joiSchemas';

const validateLoginFields = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const { error } = loginSchema.validate(payload);

  if (error) {
    throw new HttpError(StatusCodes.BAD_REQUEST, error.message);
  }

  next();
};

export default validateLoginFields;
