import { IMatches, ScoreInfo } from '../Interfaces/matches/IMatches';
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

  async findByStatus(inProgress: boolean): Promise<IMatches[]> {
    const dbResponse = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbResponse;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(scoreInfo: ScoreInfo, id: number): Promise<void> {
    await this.model.update(scoreInfo, { where: { id } });
  }
}
