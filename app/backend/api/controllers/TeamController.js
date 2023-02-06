"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teamService_1 = require("../service/teamService");
class TeamController {
    constructor() {
        this.service = new teamService_1.default();
        this.getAll = async (req, res) => {
            const result = await this.service.findAll();
            return res.status(200).json(result);
        };
        this.findById = async (req, res) => {
            const { id } = req.params;
            const result = await this.service.findById(Number(id));
            return res.status(200).json(result);
        };
    }
}
exports.default = TeamController;
//# sourceMappingURL=TeamController.js.map