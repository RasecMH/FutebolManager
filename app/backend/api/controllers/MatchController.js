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
const matchService_1 = require("../service/matchService");
class MatchController {
    constructor() {
        this.service = new matchService_1.default();
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const inProgress = req.query.inProgress ? req.query.inProgress !== 'true' : null;
            const result = yield this.service.getAll(inProgress);
            return res.status(200).json(result);
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield this.service.create(data);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const result = yield this.service.update(Number(id), data);
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
        this.finishMatch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this.service.finishMatch(Number(id));
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Finished' });
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.service.findById(Number(id));
            return res.status(200).json(result);
        });
    }
}
exports.default = MatchController;
//# sourceMappingURL=MatchController.js.map