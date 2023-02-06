"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const leaderboardService_1 = require("../service/leaderboardService");
class LeaderboardController {
    constructor() {
        this.service = new leaderboardService_1.default();
        this.getAll = async (req, res) => {
            const result = await this.service.getAll();
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        };
        this.getHome = async (req, res) => {
            const result = await this.service.getAll('homeTeam');
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        };
        this.getAway = async (req, res) => {
            const result = await this.service.getAll('awayTeam');
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        };
    }
}
exports.default = LeaderboardController;
//# sourceMappingURL=LeaderboardController.js.map