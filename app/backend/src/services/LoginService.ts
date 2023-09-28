import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import { IUsers } from '../Interfaces/users/IUsers';

type Token = {
  token: string
};
type LoginInfo = {
  email: string,
  password: string
};

export default class LoginService {
  public static async authenticate(loginInfo: LoginInfo): Promise<ServiceResponse<Token>> {
    const { email, password } = loginInfo;
    const token = jwt.sign({
      email, password,
    }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });
    return { status: 'SUCCESSFULL', data: { token } };
  }
}
