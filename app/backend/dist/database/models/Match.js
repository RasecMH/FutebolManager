"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const Team_1 = require("./Team");
class Match extends sequelize_1.Model {
}
exports.default = Match;
Match.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    homeTeam: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
    homeTeamGoals: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
    awayTeam: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
    awayTeamGoals: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
    inProgress: {
        allowNull: false,
        type: sequelize_1.BOOLEAN,
    },
}, {
    sequelize: index_1.default,
    modelName: 'Match',
    tableName: 'matches',
    underscored: true,
    timestamps: false,
});
Match.belongsTo(Team_1.default, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team_1.default, { foreignKey: 'awayTeam', as: 'teamAway' });
//# sourceMappingURL=Match.js.map