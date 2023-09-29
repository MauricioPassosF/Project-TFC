import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findByStatus(inProgress: boolean): Promise<IMatches[]>
}
