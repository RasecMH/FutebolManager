import { IMatch } from '../interfaces/MatchInterface';
import { ILeaderboard } from '../interfaces/LeaderboardInterface';

const results: Omit<ILeaderboard, 'name'> = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
};

const resultsReset = () => {
  results.totalPoints = 0;
  results.totalGames = 0;
  results.totalVictories = 0;
  results.totalDraws = 0;
  results.totalLosses = 0;
  results.goalsFavor = 0;
  results.goalsOwn = 0;
  results.goalsBalance = 0;
  results.efficiency = '';
};

const compareTeam = (match: IMatch, id: number) => {
  if (match.homeTeam === id) {
    return {
      actualTeam: match.homeTeamGoals,
      enemyTeam: match.awayTeamGoals,
    };
  }
  return {
    actualTeam: match.awayTeamGoals,
    enemyTeam: match.homeTeamGoals,
  };
};

const verifyVictory = (actualTeam: number, enemyTeam: number) => {
  if (actualTeam > enemyTeam) {
    results.totalPoints += 3;
    results.totalVictories += 1;
  } else if (actualTeam < enemyTeam) {
    results.totalLosses += 1;
  } else {
    results.totalPoints += 1;
    results.totalDraws += 1;
  }
};

export const sortResults = (res: ILeaderboard[]) => res.sort((a, b) => {
  let index = b.totalPoints - a.totalPoints;
  if (!index) index = b.totalVictories - a.totalVictories;
  if (!index) index = b.goalsBalance - a.goalsBalance;
  if (!index) index = b.goalsFavor - a.goalsFavor;
  if (!index) index = b.goalsOwn - a.goalsOwn;
  return index;
});

const getMatchesResults = (matches: IMatch[], id: number) => {
  matches.forEach((match) => {
    const { actualTeam, enemyTeam } = compareTeam(match, id);
    results.totalGames += 1;
    verifyVictory(actualTeam, enemyTeam);
    results.goalsFavor += actualTeam;
    results.goalsOwn += enemyTeam;
  });

  results.goalsBalance = results.goalsFavor - results.goalsOwn;
  results.efficiency = ((results.totalPoints / (results.totalGames * 3)) * 100).toFixed(2);
  const newResults = { ...results };
  resultsReset();
  return newResults;
};

export default getMatchesResults;
