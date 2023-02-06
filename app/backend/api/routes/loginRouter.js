"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middlewares/authenticate");
const validateLoginFields_1 = require("../middlewares/validateLoginFields");
const UserController_1 = require("../controllers/UserController");
const loginRouter = (0, express_1.Router)();
const controller = new UserController_1.default();
loginRouter.post('/', validateLoginFields_1.default, controller.login);
loginRouter.get('/validate', authenticate_1.default, controller.getRole);
exports.default = loginRouter;
//# sourceMappingURL=loginRouter.js.map