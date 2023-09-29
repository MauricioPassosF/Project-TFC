import { Router, Request, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidations from '../middlewares/LoginValidations';
import AuthValidations from '../middlewares/AuthValidations';

const router = Router();

const loginController = new LoginController();
router.post(
  '/',
  LoginValidations.ValidateFields,
  (req: Request, res: Response) => loginController.authenticate(req, res),
);

router.get(
  '/role',
  AuthValidations.ValidateToken,
  (req: Request, res: Response) => LoginController.getRole(req, res),
);

export default router;
