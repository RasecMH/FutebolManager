"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.INTEGER,
    },
    username: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    role: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    email: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    password: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
}, {
    sequelize: index_1.default,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: false,
});
//# sourceMappingURL=User.js.map