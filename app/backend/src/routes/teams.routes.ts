import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getById(req, res));

export default router;
