"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Team extends sequelize_1.Model {
}
exports.default = Team;
Team.init({
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.INTEGER,
    },
    teamName: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
}, {
    sequelize: index_1.default,
    modelName: 'Team',
    tableName: 'teams',
    underscored: true,
    timestamps: false,
});
//# sourceMappingURL=Team.js.map