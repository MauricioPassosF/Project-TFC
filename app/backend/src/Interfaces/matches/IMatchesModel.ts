import { IMatches, ScoreInfo } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findByStatus(inProgress: boolean): Promise<IMatches[]>,
  finishMatch(id:number): Promise<void>,
  updateMatch(scoreInfo: ScoreInfo, id: number): Promise<void>
}
