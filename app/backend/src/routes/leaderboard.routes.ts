import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req: Request, res: Response) => leaderboardController.getAllHome(req, res));

router.get('/away', (req: Request, res: Response) => leaderboardController.getAllAway(req, res));

router.get('/', (req: Request, res: Response) => leaderboardController.getAll(req, res));

export default router;
