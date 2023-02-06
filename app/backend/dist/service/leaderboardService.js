"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createLeaderboard_1 = require("../utils/createLeaderboard");
const Match_1 = require("../database/models/Match");
const Team_1 = require("../database/models/Team");
class LeaderboardService {
    constructor() {
        this.matchModel = Match_1.default;
        this.teamModel = Team_1.default;
    }
    async getAll(filter) {
        const teams = await this.teamModel.findAll();
        const matches = await this.matchModel.findAll({ where: { inProgress: false } });
        console.log(filter);
        const leaderboard = teams.map((team) => {
            const filtered = matches.filter((match) => {
                if (!filter) {
                    return match.homeTeam === team.id || match.awayTeam === team.id;
                }
                return match[filter] === team.id;
            });
            return { name: team.teamName, ...(0, createLeaderboard_1.default)(filtered, team.id) };
        });
        return (0, createLeaderboard_1.sortResults)(leaderboard);
    }
}
exports.default = LeaderboardService;
//# sourceMappingURL=leaderboardService.js.map