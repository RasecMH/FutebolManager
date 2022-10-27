import * as Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import HttpError from './httpError';

const ALLFIELDSMUSTBEFILLED = 'All fields must be filled';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': ALLFIELDSMUSTBEFILLED,
    'string.empty': ALLFIELDSMUSTBEFILLED,
  }),
  password: Joi.string().required().min(6).messages({
    'any.required': ALLFIELDSMUSTBEFILLED,
    'string.empty': ALLFIELDSMUSTBEFILLED,
  }),
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
