import { RequestHandler, Response } from 'express';

import * as jwt from 'jsonwebtoken';

type JWTreturn = { data:{ email: string, role: string } };

const secret = process.env.JWT_SECRET || 'secret';

export default class AuthValidations {
  public static ValidateToken: RequestHandler = (req, res, next): Response | void => {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = AuthValidations.ExtractPayload(bearerToken);
    // console.log(payload);

    if (!payload) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const { role } = payload.data;
    res.locals.role = role;
    next();
  };

  private static ExtractToken = (bearerToken: string): string => bearerToken.split(' ')[1];
  private static ExtractPayload = (bearerToken: string): false | JWTreturn => {
    try {
      const decoded = jwt.verify(AuthValidations.ExtractToken(bearerToken), secret) as JWTreturn;
      return decoded;
    } catch (error) {
      return false;
    }
  };
}
