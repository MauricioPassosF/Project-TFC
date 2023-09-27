import { Request, Response } from 'express';
import { mapStatus } from '../utils/statusByHTTP';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.teamsService.getAll();
    return res.status(mapStatus(status)).json(data);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.teamsService.getById(req.params.id);
    return res.status(mapStatus(status)).json(data);
  }
}
