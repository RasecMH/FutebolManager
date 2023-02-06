"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const errorMiddlewware_1 = require("./middlewares/errorMiddlewware");
const leaderboardRouter_1 = require("./routes/leaderboardRouter");
const loginRouter_1 = require("./routes/loginRouter");
const matchRouter_1 = require("./routes/matchRouter");
const teamRouter_1 = require("./routes/teamRouter");
require('express-async-errors');
class App {
    constructor() {
        this.app = express();
        this.config();
        // Não remover essa rota
        this.app.get('/', (req, res) => res.json({ ok: true }));
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express.json());
        this.app.use(accessControl);
        this.app.use('/login', loginRouter_1.default);
        this.app.use('/teams', teamRouter_1.default);
        this.app.use('/matches', matchRouter_1.default);
        this.app.use('/leaderboard', leaderboardRouter_1.default);
        this.app.use(errorMiddlewware_1.default);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.default = App;
// A execução dos testes de cobertura depende dessa exportação
exports.app = new App().app;
//# sourceMappingURL=index.js.map