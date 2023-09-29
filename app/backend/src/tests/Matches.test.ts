import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from '../database/models/SequelizeMatches'
import { app } from '../app'

import { Response } from 'superagent';
import * as jwt from 'jsonwebtoken';

import { mockMatchesArray, mockMatchesIPArray, mockMatchesNIPArray } from './mocks/matches';
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

    // talvez seja uma alternativa  through: { attributes: [] } },
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesArray as any)

    chaiHttpResponse = await chai.request(app).get('/matches')
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockMatchesArray)
  });

  it('Metodo Get - Filtrado por InProgress = true', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesIPArray as any)

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true')
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockMatchesIPArray)
  });

  it('Metodo Get - Filtrado por InProgress = false', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesNIPArray as any)

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false')
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockMatchesNIPArray)
  });

  it('Metodo patch - /:id/finish com token valido', async () => {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any)
    sinon.stub(jwt, 'verify').callsFake(() => {
      return {data: {email: 'teste@teste.com', role: 'User'}}
    })
    chaiHttpResponse = await chai.request(app).patch('/matches/:id/finish')
      .set('Authorization', 'Bearer: token.true') 
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ "message": "Finished" })
  });

  afterEach(sinon.restore);  
});