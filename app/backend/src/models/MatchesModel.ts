import { IMatches } from '../Interfaces/matches/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchModel implements IMatchesModel {
  private model = SequelizeMatches;
  private teamModel = SequelizeTeams;

  async findAll(): Promise<IMatches[]> {
    const dbResponse = await this.model.findAll({
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbResponse;
    // return dbResponse.map((match) => match.toJSON());
  }
}
