"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateMatchesFields_1 = require("../middlewares/validateMatchesFields");
const authenticate_1 = require("../middlewares/authenticate");
const MatchController_1 = require("../controllers/MatchController");
const matchRouter = (0, express_1.Router)();
const controller = new MatchController_1.default();
matchRouter.patch('/:id/finish', controller.finishMatch);
matchRouter.patch('/:id', controller.update);
matchRouter.get('/:id', controller.findById);
matchRouter.get('/', controller.getAll);
matchRouter.post('/', authenticate_1.default, validateMatchesFields_1.default, controller.create);
exports.default = matchRouter;
//# sourceMappingURL=matchRouter.js.map