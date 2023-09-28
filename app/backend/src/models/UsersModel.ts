import { IUsers } from '../Interfaces/users/IUsers';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { ILoginModel } from '../Interfaces/users/IUsersModel';

export default class UsersModel implements ILoginModel {
  private model = SequelizeUsers;

  async findOne(email: string): Promise<IUsers | null> {
    const dbResponse = await this.model.findOne({ where: { email } });
    return dbResponse;
  }
}
