import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeams from '../database/models/SequelizeTeams'
import { app } from '../app'

import { Response } from 'superagent';
import { mockTeamsArray } from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integracao da rota teams', () => {

  let chaiHttpResponse: Response;

  it('Metodo Get All', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(mockTeamsArray as any)

    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.equal(mockTeamsArray)
  });

  afterEach(sinon.restore);  
});