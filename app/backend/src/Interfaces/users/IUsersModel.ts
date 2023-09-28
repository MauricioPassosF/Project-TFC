import { IUsers } from './IUsers';

export interface ILoginModel {
  findOne(email:string): Promise<IUsers | null>
}
