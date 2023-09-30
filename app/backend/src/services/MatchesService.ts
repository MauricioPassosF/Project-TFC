import TeamsModel from '../models/TeamsModel';
import { IMatches, NewMatch, ScoreInfo } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import MatchModel from '../models/MatchesModel';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchModel(),
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFULL', data: matches };
  }

  public async getByStatus(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    const filteredMatches = await this.matchesModel.findByStatus(inProgress === 'true');
    return { status: 'SUCCESSFULL', data: filteredMatches };
  }

  public async finishMatch(id: string): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.finishMatch(Number(id));
    const data = { message: 'Finished' };
    return { status: 'SUCCESSFULL', data };
  }

  public async updateMatch(
    scoreInfo: ScoreInfo,
    id: string,
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.updateMatch(scoreInfo, Number(id));
    const data = { message: 'Updated' };
    return { status: 'SUCCESSFULL', data };
  }

  public async createMatch(matchInfo: NewMatch): Promise<ServiceResponse<IMatches>> {
    const teamsAreValid = await this.validateTeams(matchInfo.homeTeamId, matchInfo.awayTeamId);
    if (!teamsAreValid) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchesModel.create(matchInfo);
    return { status: 'CREATED', data: newMatch };
  }

  private async validateTeams(homeId: number, awayId: number): Promise<boolean> {
    const validations = await Promise.all([
      this.teamsModel.findByPk(homeId),
      this.teamsModel.findByPk(awayId),
    ]);
    return !validations.includes(null);
  }
}
