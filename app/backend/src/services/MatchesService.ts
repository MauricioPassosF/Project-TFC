import { IMatches, ScoreInfo } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import MatchModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(private matchesModel: IMatchesModel = new MatchModel()) {}

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
}
