import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import { IMatch } from '../interfaces/MatchInterface';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import HttpError from '../utils/httpError';

export default class MatchService {
  matchModel = Match;
  teamModel = Team;

  async getAll(filter?: boolean | null): Promise<IMatch[] | []> {
    return this.matchModel.findAll({
      include: [
        { model: this.teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: this.teamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { inProgress: { [Op.not]: filter } },
    });
  }

  async create(data: Omit<IMatch, 'id'>): Promise<IMatch | null> {
    const teams = await this.teamModel.findAll();
    const validateTeams = teams.filter((team) => (
      team.id === data.awayTeam || team.id === data.homeTeam
    ));
    if (validateTeams.length === 2) {
      return this.matchModel.create({
        ...data,
        inProgress: true,
      });
    }

    throw new HttpError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
  }

  async finishMatch(id: number): Promise<void> {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }

  async findById(id: number): Promise<IMatch | null> {
    return this.matchModel.findOne({ where: { id } });
  }

  async update(
    id: number,
    data: Pick<IMatch, 'homeTeamGoals' | 'awayTeamGoals'>,
  ): Promise<IMatch | null> {
    await this.matchModel.update(data, { where: { id } });
    return this.findById(id);
  }
}
