import { RequestHandler, Response } from 'express';

export default class LoginValidations {
  public static ValidateFields: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!this.ValidateEmail(email) || !this.ValidatePassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };

  private static regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static ValidateEmail = (email: string): boolean => LoginValidations.regex.test(email);
  private static ValidatePassword = (password: string): boolean => password.length >= 6;
}
