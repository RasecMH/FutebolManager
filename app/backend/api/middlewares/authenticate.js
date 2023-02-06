"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
const httpError_1 = require("../utils/httpError");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        if (!token) {
            throw new httpError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
        }
        const payload = yield (0, jwt_1.validateToken)(token);
        if (payload.role) {
            req.body.role = payload.role;
            return next();
        }
        throw new httpError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Erro ao verificar token');
    }
    catch (error) {
        next(error);
    }
});
exports.default = authenticate;
//# sourceMappingURL=authenticate.js.map