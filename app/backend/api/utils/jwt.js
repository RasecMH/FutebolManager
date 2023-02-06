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
exports.validateToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const httpError_1 = require("./httpError");
const jwtSecret = process.env.JWT_SECRET || 'JWT_SECRET';
const createToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, jsonwebtoken_1.sign)(payload, jwtSecret, {
        expiresIn: '1d',
        algorithm: 'HS256',
    });
});
exports.createToken = createToken;
const validateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, jwtSecret);
        return payload;
    }
    catch (error) {
        throw new httpError_1.default(401, 'Token must be a valid token');
    }
});
exports.validateToken = validateToken;
//# sourceMappingURL=jwt.js.map