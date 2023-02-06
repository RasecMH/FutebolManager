"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const joiSchemas_1 = require("../utils/joiSchemas");
const httpError_1 = require("../utils/httpError");
const validateMatchesFields = (req, res, next) => {
    const payload = req.body;
    joiSchemas_1.matchesSchema.validate(payload);
    if (payload.awayTeam === payload.homeTeam) {
        throw new httpError_1.default(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, 'It is not possible to create a match with two equal teams');
    }
    next();
};
exports.default = validateMatchesFields;
//# sourceMappingURL=validateMatchesFields.js.map