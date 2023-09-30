import { ITeams } from '../Interfaces/teams/ITeams';
import { ILearderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class LeaderboardHandler {
  public static getLeaderboardHome(teams: ITeams[], matches: IMatches[]): ILearderboard[] {
    const leaderboard = teams
      .map(({ id, teamName }) => {
        const matchesByTeam = matches.filter((match) => match.homeTeamId === id);
        return { name: teamName, ...this.getLeaderboardInfo(matchesByTeam) };
      })
      .sort((first, second) => {
        if (first.totalPoints === second.totalPoints) {
          if (first.goalsBalance === second.goalsBalance) {
            return second.goalsFavor - first.goalsFavor;
          }
          return second.goalsBalance - first.goalsBalance;
        }
        return second.totalPoints - first.totalPoints;
      });
    return leaderboard;
  }

  private static getResults(matches: IMatches[]) {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        totalDraws += 1;
      } else if (homeTeamGoals > awayTeamGoals) {
        totalVictories += 1;
      } else if (homeTeamGoals < awayTeamGoals) {
        totalLosses += 1;
      }
    });
    return { totalVictories, totalDraws, totalLosses };
  }

  private static getLeaderboardInfo(matches: IMatches[]): Omit<ILearderboard, 'name'> {
    let goalsOwn = 0;
    let goalsFavor = 0;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      goalsOwn += awayTeamGoals;
      goalsFavor += homeTeamGoals;
    });
    const results = this.getResults(matches);
    const totalGames = matches.length;
    const totalPoints = results.totalDraws + (results.totalVictories * 3);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number(((totalPoints * 100) / (totalGames * 3)).toFixed(2));
    return { ...results, goalsFavor, goalsOwn, totalGames, totalPoints, goalsBalance, efficiency };
  }
}
