"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardController_1 = require("../controllers/LeaderboardController");
const leaderboardRouter = (0, express_1.Router)();
const controller = new LeaderboardController_1.default();
leaderboardRouter.get('/home', controller.getHome);
leaderboardRouter.get('/away', controller.getAway);
leaderboardRouter.get('/', controller.getAll);
exports.default = leaderboardRouter;
//# sourceMappingURL=leaderboardRouter.js.map