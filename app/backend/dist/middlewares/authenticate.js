"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
const httpError_1 = require("../utils/httpError");
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            throw new httpError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
        }
        const payload = await (0, jwt_1.validateToken)(token);
        if (payload.role) {
            req.body.role = payload.role;
            return next();
        }
        throw new httpError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Erro ao verificar token');
    }
    catch (error) {
        next(error);
    }
};
exports.default = authenticate;
//# sourceMappingURL=authenticate.js.map