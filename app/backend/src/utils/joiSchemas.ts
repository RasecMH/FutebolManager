import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import HttpError from './httpError';

const ALLFIELDSMUSTBEFILLED = 'All fields must be filled';

export const loginSchema = Joi.object({
  email: Joi.string().required()
    .error(new HttpError(StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED))
    .email()
    .error(new HttpError(StatusCodes.BAD_REQUEST, 'Invalid email format')),
  password: Joi.string().required()
    .error(new HttpError(StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED))
    .min(6)
    .error(new HttpError(StatusCodes.BAD_REQUEST, 'Password need at least 6 characters')),
});

export const matchesSchema = Joi.object({
  homeTeam: Joi.number().required()
    .error(new HttpError(StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
  awayTeam: Joi.number().required()
    .error(new HttpError(StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
  homeTeamGoals: Joi.number().required()
    .error(new HttpError(StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
  awayTeamGoals: Joi.number().required()
    .error(new HttpError(StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
});

export const matchesUpdateSchema = Joi.object({
  homeTeamGoals: Joi.number().required()
    .error(new HttpError(StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
  awayTeamGoals: Joi.number().required()
    .error(new HttpError(StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
});
