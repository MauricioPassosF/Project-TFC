import { RequestHandler, Response } from 'express';

export default class LoginValidations {
  static ValidateFields: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  };
}
