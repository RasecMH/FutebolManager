"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const httpErrorMiddleware = (err, req, res, _next) => {
    console.log('err', err);
    const { status, message } = err;
    res.status(status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};
exports.default = httpErrorMiddleware;
//# sourceMappingURL=errorMiddlewware.js.map