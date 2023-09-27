import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeams } from '../Interfaces/teams/ITeams';
import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFULL', data: teams };
  }

  public async getById(id: string): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamsModel.findByPk(Number(id));
    return { status: 'SUCCESSFULL', data: team };
  }
}
