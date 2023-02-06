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
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("../utils/jwt");
const httpError_1 = require("../utils/httpError");
const userService_1 = require("../service/userService");
class UserController {
    constructor() {
        this.service = new userService_1.default();
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.service.findByEmail(email);
                if (!user)
                    throw new httpError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
                const validatePassword = yield (0, bcryptjs_1.compare)(password, user.password);
                if (!validatePassword) {
                    throw new httpError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
                }
                const token = yield (0, jwt_1.createToken)({ id: user.id, role: user.role });
                res.status(200).json({ token });
            }
            catch (error) {
                next(error);
            }
        });
        this.getRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { role } = req.body;
            res.status(200).json({ role });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map