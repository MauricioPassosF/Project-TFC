import { Request, Response } from 'express';
import { mapStatus } from '../utils/statusByHTTP';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public async authenticate(req:Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { data, status } = await this.loginService.authenticate({ email, password });
    return res.status(mapStatus(status)).json(data);
  }

  public static async getRole(req:Request, res: Response): Promise<Response> {
    const { role } = res.locals;
    return res.status(200).json({ role });
  }
}
