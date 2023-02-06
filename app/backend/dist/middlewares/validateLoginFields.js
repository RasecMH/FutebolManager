"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const httpError_1 = require("../utils/httpError");
const joiSchemas_1 = require("../utils/joiSchemas");
const validateLoginFields = (req, res, next) => {
    const payload = req.body;
    const { error } = joiSchemas_1.loginSchema.validate(payload);
    if (error) {
        throw new httpError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
    next();
};
exports.default = validateLoginFields;
//# sourceMappingURL=validateLoginFields.js.map