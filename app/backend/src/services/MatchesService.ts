import { IMatches } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import MatchModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFULL', data: matches };
  }

  public async getByStatus(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    const filteredMatches = await this.matchesModel.findByStatus(inProgress === 'true');
    return { status: 'SUCCESSFULL', data: filteredMatches };
  }
}
