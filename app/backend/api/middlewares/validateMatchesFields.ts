import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { matchesSchema } from '../utils/joiSchemas';
import HttpError from '../utils/httpError';

const validateMatchesFields = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  matchesSchema.validate(payload);

  if (payload.awayTeam === payload.homeTeam) {
    throw new HttpError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      'It is not possible to create a match with two equal teams',
    );
  }

  next();
};

export default validateMatchesFields;
