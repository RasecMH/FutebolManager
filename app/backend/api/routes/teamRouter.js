"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeamController_1 = require("../controllers/TeamController");
const teamRouter = (0, express_1.Router)();
const controller = new TeamController_1.default();
teamRouter.get('/', controller.getAll);
teamRouter.get('/:id', controller.findById);
exports.default = teamRouter;
//# sourceMappingURL=teamRouter.js.map