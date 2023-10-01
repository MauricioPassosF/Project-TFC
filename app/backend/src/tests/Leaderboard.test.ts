import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from '../database/models/SequelizeMatches';
import { app } from '../app';

import { Response } from 'superagent';

import SequelizeTeams from '../database/models/SequelizeTeams';
import { mockTeamsArray } from './mocks/teams';
import { mockLeaderboardAway, mockLeaderboardHome, mockMatchesLeaderboardArray } from './mocks/leaderboard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integracao da rota leaderboard', () => {
  let chaiHttpResponse: Response;

    it('Leaderboard Home', async () => {
      const mockFindAllReturn = SequelizeTeams.bulkBuild(mockTeamsArray)
      sinon.stub(SequelizeTeams, 'findAll').resolves(mockFindAllReturn)
      sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesLeaderboardArray as any);
  
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(mockLeaderboardHome);
    });

    it('Leaderboard Away', async () => {
      const mockFindAllReturn = SequelizeTeams.bulkBuild(mockTeamsArray)
      sinon.stub(SequelizeTeams, 'findAll').resolves(mockFindAllReturn)
      sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesLeaderboardArray as any);
  
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(mockLeaderboardAway);
    });

  afterEach(sinon.restore);
});