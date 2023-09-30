import { Request, Response } from 'express';
import { mapStatus } from '../utils/statusByHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async getAllHome(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.leaderboardService.getAllHome();
    return res.status(mapStatus(status)).json(data);
  }
}
