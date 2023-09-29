import { Request, Response } from 'express';
import { mapStatus } from '../utils/statusByHTTP';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesServices = new MatchesService(),
  ) {}

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.matchesServices.getAll();
    return res.status(mapStatus(status)).json(data);
  }
}
