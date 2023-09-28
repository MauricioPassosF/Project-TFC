import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import UsersModel from '../models/UsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILoginModel } from '../Interfaces/users/IUsersModel';

type Token = {
  token: string
};
type LoginInfo = {
  email: string,
  password: string
};

export default class LoginService {
  constructor(
    private usersModel: ILoginModel = new UsersModel(),
  ) {}

  public async authenticate(loginInfo: LoginInfo): Promise<ServiceResponse<Token>> {
    const { email, password } = loginInfo;
    const user = await this.usersModel.findOne(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = jwt.sign({
      email, password,
    }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });
    return { status: 'SUCCESSFULL', data: { token } };
  }
}
