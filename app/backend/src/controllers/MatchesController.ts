import { Request, Response } from 'express';
import { mapStatus } from '../utils/statusByHTTP';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesServices = new MatchesService()) {}

  public async getAll(req: Request, res: Response): Promise<Response> {
    const {
      query: { inProgress },
    } = req;
    const { data, status } = !inProgress
      ? await this.matchesServices.getAll()
      : await this.matchesServices.getByStatus(inProgress as string);
    return res.status(mapStatus(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { params: { id } } = req;
    const { data, status } = await this.matchesServices.finishMatch(id);
    return res.status(mapStatus(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { body, params: { id } } = req;
    const { data, status } = await this.matchesServices.updateMatch(body, id);
    return res.status(mapStatus(status)).json(data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { data, status } = await this.matchesServices.createMatch(body);
    return res.status(mapStatus(status)).json(data);
  }
}
