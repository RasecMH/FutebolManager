"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../database/models/User");
class UserService {
    constructor() {
        this.model = User_1.default;
    }
    async findByEmail(email) {
        return this.model.findOne({ where: { email } });
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map