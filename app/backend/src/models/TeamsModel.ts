import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbResponse = await this.model.findAll();
    // console.log(dbResponse);
    return dbResponse.map((team) => team.toJSON());
  }
}
