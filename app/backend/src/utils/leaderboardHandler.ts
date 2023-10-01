import { ITeams } from '../Interfaces/teams/ITeams';
import { ILearderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class LeaderboardHandler {
  public static getLeaderboardHome(teams: ITeams[], matches: IMatches[]): ILearderboard[] {
    const leaderboard = teams.map(({ id, teamName }) => {
      const matchesByTeam = matches.filter((match) => match.homeTeamId === id);
      return { name: teamName, ...this.getLeaderboardInfo(matchesByTeam, 'home') };
    });
    return this.orderLeaderboard(leaderboard);
  }

  public static getLeaderboardAway(teams: ITeams[], matches: IMatches[]): ILearderboard[] {
    const leaderboard = teams.map(({ id, teamName }) => {
      const matchesByTeam = matches.filter((match) => match.awayTeamId === id);
      return { name: teamName, ...this.getLeaderboardInfo(matchesByTeam, 'away') };
    });
    return this.orderLeaderboard(leaderboard);
  }

  public static getLeaderboard(teams: ITeams[], matches: IMatches[]): ILearderboard[] {
    const leaderboard = teams.map(({ id, teamName }) => {
      const matchesByTeamHome = matches.filter((match) => match.homeTeamId === id);
      const matchesByTeamAway = matches.filter((match) => match.awayTeamId === id);
      const home = { ...this.getLeaderboardInfo(matchesByTeamHome, 'home') };
      const away = { ...this.getLeaderboardInfo(matchesByTeamAway, 'away') };
      return { name: teamName,
        totalPoints: home.totalPoints + away.totalPoints,
        totalGames: home.totalGames + away.totalGames,
        totalVictories: home.totalVictories + away.totalVictories,
        totalDraws: home.totalDraws + away.totalDraws,
        totalLosses: home.totalLosses + away.totalLosses,
        goalsFavor: home.goalsFavor + away.goalsFavor,
        goalsOwn: home.goalsOwn + away.goalsOwn,
        goalsBalance: home.goalsBalance + away.goalsBalance,
        efficiency: Number((((home.totalPoints + away.totalPoints) * 100)
        / ((home.totalGames + away.totalGames) * 3)).toFixed(2)) };
    });
    return this.orderLeaderboard(leaderboard);
  }

  private static orderLeaderboard(leaderboard: ILearderboard[]): ILearderboard[] {
    return leaderboard.sort((first, second) => {
      if (first.totalPoints === second.totalPoints) {
        if (first.goalsBalance === second.goalsBalance) {
          return second.goalsFavor - first.goalsFavor;
        }
        return second.goalsBalance - first.goalsBalance;
      }
      return second.totalPoints - first.totalPoints;
    });
  }

  private static getResultsHome(matches: IMatches[]) {
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

  private static getResultsAway(matches: IMatches[]) {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        totalDraws += 1;
      } else if (homeTeamGoals < awayTeamGoals) {
        totalVictories += 1;
      } else if (homeTeamGoals > awayTeamGoals) {
        totalLosses += 1;
      }
    });
    return { totalVictories, totalDraws, totalLosses };
  }

  private static getGoals(matches: IMatches[], local:'away' | 'home') {
    let goalsOwn = 0;
    let goalsFavor = 0;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (local === 'home') {
        goalsOwn += awayTeamGoals;
        goalsFavor += homeTeamGoals;
      } else if (local === 'away') {
        goalsOwn += homeTeamGoals;
        goalsFavor += awayTeamGoals;
      }
    });
    return { goalsFavor, goalsOwn };
  }

  private static getLeaderboardInfo(
    matches: IMatches[],
    local: 'away' | 'home',
  ): Omit<ILearderboard, 'name'> {
    const goals = this.getGoals(matches, local);
    const results = local === 'home' ? this.getResultsHome(matches) : this.getResultsAway(matches);
    const totalGames = matches.length;
    const totalPoints = results.totalDraws + results.totalVictories * 3;
    const goalsBalance = goals.goalsFavor - goals.goalsOwn;
    const efficiency = Number(((totalPoints * 100) / (totalGames * 3)).toFixed(2));
    return { ...results, ...goals, totalGames, totalPoints, goalsBalance, efficiency };
  }
}
