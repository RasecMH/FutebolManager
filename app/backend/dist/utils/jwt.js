"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const httpError_1 = require("./httpError");
const jwtSecret = process.env.JWT_SECRET || 'JWT_SECRET';
const createToken = async (payload) => (0, jsonwebtoken_1.sign)(payload, jwtSecret, {
    expiresIn: '1d',
    algorithm: 'HS256',
});
exports.createToken = createToken;
const validateToken = async (token) => {
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, jwtSecret);
        return payload;
    }
    catch (error) {
        throw new httpError_1.default(401, 'Token must be a valid token');
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=jwt.js.map