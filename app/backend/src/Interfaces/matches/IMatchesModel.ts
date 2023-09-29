import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findByStatus(inProgress: boolean): Promise<IMatches[]>,
  finishMatch(id:number): Promise<void>
}
