import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeams from '../database/models/SequelizeTeams'
import { app } from '../app'

import { Response } from 'superagent';
import { mockTeamsArray, mockTeam } from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integracao da rota teams', () => {

  let chaiHttpResponse: Response;

  it('Metodo Get All', async () => {
    const mockFindAllReturn = SequelizeTeams.bulkBuild(mockTeamsArray)
    sinon.stub(SequelizeTeams, 'findAll').resolves(mockFindAllReturn)

    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockTeamsArray)
  });

  it('Metodo Get By Id', async () => {
    const mockFindByPkReturn = SequelizeTeams.build(mockTeam)
    sinon.stub(SequelizeTeams, 'findByPk').resolves(mockFindByPkReturn)

    chaiHttpResponse = await chai.request(app).get('/teams/2')
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockTeam)
  });

  afterEach(sinon.restore);  
});