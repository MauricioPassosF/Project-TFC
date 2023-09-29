import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from '../database/models/SequelizeMatches'
import { app } from '../app'

import { Response } from 'superagent';

import { mockMatchesArray } from './mocks/matches';
import { IMatchesWithTeams } from '../Interfaces/matches/IMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integracao da rota matches', () => {
  let chaiHttpResponse: Response;

  it('Metodo Get All', async () => {
    // const mockFindAllReturn = SequelizeMatches.bulkBuild(mockMatchesArray as any, {
    //   include: [
    //     { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
    //     { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
    //   ],
    // })
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesArray as any)

    chaiHttpResponse = await chai.request(app).get('/matches')
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockMatchesArray)
  });

  afterEach(sinon.restore);  
});