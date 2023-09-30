import { RequestHandler, Response } from 'express';

export default class MatchesValidations {
  public static ValidateTeams: RequestHandler = (req, res, next): Response | void => {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  };
}
