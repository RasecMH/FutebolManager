"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
require("dotenv/config");
const PORT = process.env.APP_PORT || 3001;
index_1.default.start(PORT);
//# sourceMappingURL=server.js.map