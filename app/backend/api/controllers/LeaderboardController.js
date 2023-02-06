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
const leaderboardService_1 = require("../service/leaderboardService");
class LeaderboardController {
    constructor() {
        this.service = new leaderboardService_1.default();
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getAll();
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
        this.getHome = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getAll('homeTeam');
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
        this.getAway = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getAll('awayTeam');
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
    }
}
exports.default = LeaderboardController;
//# sourceMappingURL=LeaderboardController.js.map