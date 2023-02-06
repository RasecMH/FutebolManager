"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = require("../database/models/Team");
class TeamService {
    constructor() {
        this.model = Team_1.default;
    }
    async findById(id) {
        return this.model.findOne({ where: { id } });
    }
    async findAll() {
        return this.model.findAll();
    }
}
exports.default = TeamService;
//# sourceMappingURL=teamService.js.map