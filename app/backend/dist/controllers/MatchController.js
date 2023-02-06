"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const matchService_1 = require("../service/matchService");
class MatchController {
    constructor() {
        this.service = new matchService_1.default();
        this.getAll = async (req, res) => {
            const inProgress = req.query.inProgress ? req.query.inProgress !== 'true' : null;
            const result = await this.service.getAll(inProgress);
            return res.status(200).json(result);
        };
        this.create = async (req, res, next) => {
            try {
                const data = req.body;
                const result = await this.service.create(data);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res) => {
            const { id } = req.params;
            const data = req.body;
            const result = await this.service.update(Number(id), data);
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        };
        this.finishMatch = async (req, res) => {
            const { id } = req.params;
            await this.service.finishMatch(Number(id));
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Finished' });
        };
        this.findById = async (req, res) => {
            const { id } = req.params;
            const result = await this.service.findById(Number(id));
            return res.status(200).json(result);
        };
    }
}
exports.default = MatchController;
//# sourceMappingURL=MatchController.js.map