import { ILearderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import LeaderboardHandler from '../utils/leaderboardHandler';

export default class LeaderboardService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
    private matchesModel: IMatchesModel = new MatchModel(),
  ) {}

  public async getAllHome(): Promise<ServiceResponse<ILearderboard[]>> {
    const teams = await this.teamsModel.findAll();
    const finishedMatches = await this.matchesModel.findByStatus(false);
    const leaderBoardHome = LeaderboardHandler.getLeaderboardHome(teams, finishedMatches);
    return { status: 'SUCCESSFULL', data: leaderBoardHome };
  }

  public async getAllAway(): Promise<ServiceResponse<ILearderboard[]>> {
    const teams = await this.teamsModel.findAll();
    const finishedMatches = await this.matchesModel.findByStatus(false);
    const leaderBoardAway = LeaderboardHandler.getLeaderboardAway(teams, finishedMatches);
    return { status: 'SUCCESSFULL', data: leaderBoardAway };
  }

  public async getAll(): Promise<ServiceResponse<ILearderboard[]>> {
    const teams = await this.teamsModel.findAll();
    const finishedMatches = await this.matchesModel.findByStatus(false);
    const leaderboard = LeaderboardHandler.getLeaderboard(teams, finishedMatches);
    return { status: 'SUCCESSFULL', data: leaderboard };
  }
}
