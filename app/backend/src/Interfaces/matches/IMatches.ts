export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean
}

export interface IMatchesWithTeams extends IMatches {
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  },
}

export type ScoreInfo = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};
