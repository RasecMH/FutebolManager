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
const sequelize_1 = require("sequelize");
const Match_1 = require("../database/models/Match");
const Team_1 = require("../database/models/Team");
const httpError_1 = require("../utils/httpError");
class MatchService {
    constructor() {
        this.matchModel = Match_1.default;
        this.teamModel = Team_1.default;
    }
    getAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.matchModel.findAll({
                include: [
                    { model: this.teamModel, as: 'teamHome', attributes: ['teamName'] },
                    { model: this.teamModel, as: 'teamAway', attributes: ['teamName'] },
                ],
                where: { inProgress: { [sequelize_1.Op.not]: filter } },
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield this.teamModel.findAll();
            const validateTeams = teams.filter((team) => (team.id === data.awayTeam || team.id === data.homeTeam));
            if (validateTeams.length === 2) {
                return this.matchModel.create(Object.assign(Object.assign({}, data), { inProgress: true }));
            }
            throw new httpError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'There is no team with such id!');
        });
    }
    finishMatch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.matchModel.update({ inProgress: false }, { where: { id } });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.matchModel.findOne({ where: { id } });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.matchModel.update(data, { where: { id } });
            return this.findById(id);
        });
    }
}
exports.default = MatchService;
//# sourceMappingURL=matchService.js.map