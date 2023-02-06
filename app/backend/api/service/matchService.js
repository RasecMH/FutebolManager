"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const Match_1 = require("../database/models/Match");
const Team_1 = require("../database/models/Team");
const httpError_1 = require("../utils/httpError");
class MatchService {
    constructor() {
        this.matchModel = Match_1.default;
        this.teamModel = Team_1.default;
    }
    async getAll(filter) {
        return this.matchModel.findAll({
            include: [
                { model: this.teamModel, as: 'teamHome', attributes: ['teamName'] },
                { model: this.teamModel, as: 'teamAway', attributes: ['teamName'] },
            ],
            where: { inProgress: { [sequelize_1.Op.not]: filter } },
        });
    }
    async create(data) {
        const teams = await this.teamModel.findAll();
        const validateTeams = teams.filter((team) => (team.id === data.awayTeam || team.id === data.homeTeam));
        if (validateTeams.length === 2) {
            return this.matchModel.create({
                ...data,
                inProgress: true,
            });
        }
        throw new httpError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }
    async finishMatch(id) {
        await this.matchModel.update({ inProgress: false }, { where: { id } });
    }
    async findById(id) {
        return this.matchModel.findOne({ where: { id } });
    }
    async update(id, data) {
        await this.matchModel.update(data, { where: { id } });
        return this.findById(id);
    }
}
exports.default = MatchService;
//# sourceMappingURL=matchService.js.map