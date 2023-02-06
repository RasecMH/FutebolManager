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
const createLeaderboard_1 = require("../utils/createLeaderboard");
const Match_1 = require("../database/models/Match");
const Team_1 = require("../database/models/Team");
class LeaderboardService {
    constructor() {
        this.matchModel = Match_1.default;
        this.teamModel = Team_1.default;
    }
    getAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield this.teamModel.findAll();
            const matches = yield this.matchModel.findAll({ where: { inProgress: false } });
            console.log(filter);
            const leaderboard = teams.map((team) => {
                const filtered = matches.filter((match) => {
                    if (!filter) {
                        return match.homeTeam === team.id || match.awayTeam === team.id;
                    }
                    return match[filter] === team.id;
                });
                return Object.assign({ name: team.teamName }, (0, createLeaderboard_1.default)(filtered, team.id));
            });
            return (0, createLeaderboard_1.sortResults)(leaderboard);
        });
    }
}
exports.default = LeaderboardService;
//# sourceMappingURL=leaderboardService.js.map