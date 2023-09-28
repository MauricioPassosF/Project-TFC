import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUsers from '../database/models/SequelizeUsers'
import { app } from '../app'

import { Response } from 'superagent';

import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integracao da rota login', () => {
  let chaiHttpResponse: Response;

  it('Metodo Post - sem campo email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({
        password: 'teste'
      });
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({message: "All fields must be filled" })
  });

  it('Metodo Post - sem campo password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({
        email: 'teste@teste.com'
      });
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({message: "All fields must be filled" })
  });

  it('Metodo Post - com campos corretos', async () => {
    const mockToken = "dhgsjfhg";
    // sinon.stub(jwt, 'sign').returns(mockToken)
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'teste'
      });
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token')
    // expect(chaiHttpResponse.body).to.deep.equal({token: mockToken })
  });

  afterEach(sinon.restore);  
});