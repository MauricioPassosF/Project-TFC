import { Router, Request, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidations from '../middlewares/LoginValidations';

const router = Router();

// const loginController = new LoginController();
router.post(
  '/',
  LoginValidations.ValidateFields,
  (req: Request, res: Response) => LoginController.authenticate(req, res),
);

export default router;
