import getMatchesResults, { sortResults } from '../utils/createLeaderboard';
import { ILeaderboard } from '../interfaces/LeaderboardInterface';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class LeaderboardService {
  matchModel = Match;
  teamModel = Team;

  async getAll(filter?: 'homeTeam' | 'awayTeam'): Promise<ILeaderboard[] | []> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    console.log(filter);

    const leaderboard = teams.map((team) => {
      const filtered = matches.filter((match) => {
        if (!filter) {
          return match.homeTeam === team.id || match.awayTeam === team.id;
        }
        return match[filter] === team.id;
      });
      return { name: team.teamName, ...getMatchesResults(filtered, team.id) };
    });

    return sortResults(leaderboard);
  }
}
