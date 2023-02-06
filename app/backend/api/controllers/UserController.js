"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("../utils/jwt");
const httpError_1 = require("../utils/httpError");
const userService_1 = require("../service/userService");
class UserController {
    constructor() {
        this.service = new userService_1.default();
        this.login = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const user = await this.service.findByEmail(email);
                if (!user)
                    throw new httpError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
                const validatePassword = await (0, bcryptjs_1.compare)(password, user.password);
                if (!validatePassword) {
                    throw new httpError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
                }
                const token = await (0, jwt_1.createToken)({ id: user.id, role: user.role });
                res.status(200).json({ token });
            }
            catch (error) {
                next(error);
            }
        };
        this.getRole = async (req, res) => {
            const { role } = req.body;
            res.status(200).json({ role });
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map