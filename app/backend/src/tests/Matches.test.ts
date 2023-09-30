import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from '../database/models/SequelizeMatches';
import { app } from '../app';

import { Response } from 'superagent';
import * as jwt from 'jsonwebtoken';

import { mockMatchesArray, mockMatchesIPArray, mockMatchesNIPArray } from './mocks/matches';
import { IMatchesWithTeams } from '../Interfaces/matches/IMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { mockTeam } from './mocks/teams';

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
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesArray as any);

    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockMatchesArray);
  });

  it('Metodo Get - Filtrado por InProgress = true', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesIPArray as any);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockMatchesIPArray);
  });

  it('Metodo Get - Filtrado por InProgress = false', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesNIPArray as any);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockMatchesNIPArray);
  });

  it('Metodo patch - /:id/finish com token valido', async () => {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
    sinon.stub(jwt, 'verify').callsFake(() => {
      return { data: { email: 'teste@teste.com', role: 'User' } };
    });
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/:id/finish')
      .set('Authorization', 'Bearer: token.true');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
  });

  it('Metodo patch - /:id com token valido', async () => {
    const mockUpdate = { homeTeamGoals: 3, awayTeamGoals: 1 };
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
    sinon.stub(jwt, 'verify').callsFake(() => {
      return { data: { email: 'teste@teste.com', role: 'User' } };
    });
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/:id')
      .set('Authorization', 'Bearer: token.true')
      .send(mockUpdate);
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Updated' });
  });

  it('Metodo post - /, com token valido e dados validos', async () => {
    const mockCreate =  {
    "homeTeamId": 16,
    "awayTeamId": 8, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 3
    }
    const mockReturn =  {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 3,
      "inProgress": true
    };
    const mockCreateReturn = SequelizeMatches.build(mockReturn)
    sinon.stub(SequelizeTeams, 'findByPk').resolves(mockTeam as any)
    sinon.stub(SequelizeMatches, 'create').resolves(mockCreateReturn);
    sinon.stub(jwt, 'verify').callsFake(() => {
      return { data: { email: 'teste@teste.com', role: 'User' } };
    });
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'Bearer: token.true')
      .send(mockCreate);
    expect(chaiHttpResponse.status).to.equal(201);
    expect(chaiHttpResponse.body).to.deep.equal(mockReturn);
  });

  it('Metodo post - /, com token valido e times iguais', async () => {
    const mockCreate =  {
    "homeTeamId": 2,
    "awayTeamId": 2, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 3
    }
    sinon.stub(jwt, 'verify').callsFake(() => {
      return { data: { email: 'teste@teste.com', role: 'User' } };
    });
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'Bearer: token.true')
      .send(mockCreate);
    expect(chaiHttpResponse.status).to.equal(422);
    expect(chaiHttpResponse.body).to.deep.equal({ "message": "It is not possible to create a match with two equal teams" });
  });

  it('Metodo post - /, com token valido e time invalido', async () => {
    const mockCreate =  {
    "homeTeamId": 50,
    "awayTeamId": 8, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 3
    }
  
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null)
    sinon.stub(jwt, 'verify').callsFake(() => {
      return { data: { email: 'teste@teste.com', role: 'User' } };
    });
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'Bearer: token.true')
      .send(mockCreate);
      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ "message": "There is no team with such id!" });
    });

  afterEach(sinon.restore);
});
