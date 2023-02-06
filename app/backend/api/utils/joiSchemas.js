"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesUpdateSchema = exports.matchesSchema = exports.loginSchema = void 0;
const Joi = require("joi");
const http_status_codes_1 = require("http-status-codes");
const httpError_1 = require("./httpError");
const ALLFIELDSMUSTBEFILLED = 'All fields must be filled';
exports.loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': ALLFIELDSMUSTBEFILLED,
        'string.empty': ALLFIELDSMUSTBEFILLED,
    }),
    password: Joi.string().required().min(6).messages({
        'any.required': ALLFIELDSMUSTBEFILLED,
        'string.empty': ALLFIELDSMUSTBEFILLED,
    }),
});
exports.matchesSchema = Joi.object({
    homeTeam: Joi.number().required()
        .error(new httpError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
    awayTeam: Joi.number().required()
        .error(new httpError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
    homeTeamGoals: Joi.number().required()
        .error(new httpError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
    awayTeamGoals: Joi.number().required()
        .error(new httpError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
});
exports.matchesUpdateSchema = Joi.object({
    homeTeamGoals: Joi.number().required()
        .error(new httpError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
    awayTeamGoals: Joi.number().required()
        .error(new httpError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, ALLFIELDSMUSTBEFILLED)),
});
//# sourceMappingURL=joiSchemas.js.map