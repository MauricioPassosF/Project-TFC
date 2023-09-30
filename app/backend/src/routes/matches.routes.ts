import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import AuthValidations from '../middlewares/AuthValidations';
import MatchesValidations from '../middlewares/MatchesValidations';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));

router.patch(
  '/:id',
  AuthValidations.ValidateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

router.patch(
  '/:id/finish',
  AuthValidations.ValidateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.post(
  '/',
  AuthValidations.ValidateToken,
  MatchesValidations.ValidateTeams,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
