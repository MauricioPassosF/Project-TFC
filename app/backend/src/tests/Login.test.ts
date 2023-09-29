import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUsers from '../database/models/SequelizeUsers'
import { app } from '../app'

import { Response } from 'superagent';

import * as jwt from 'jsonwebtoken';
import { mockUser } from './mocks/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integracao da rota login', () => {
  let chaiHttpResponse: Response;

  it('Metodo Post - sem campo email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({
        password: 'testes'
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

  it('Metodo Post - email invalido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({
        email: 'testeteste.com',
        password: 'testes'
      });
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: "Invalid email or password" })
  });

  it('Metodo Post - password invalido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'teste'
      });
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: "Invalid email or password" })
  });

  it('Metodo Post - email fora do banco de dados', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null)

    chaiHttpResponse = await chai.request(app).post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'testes'
      });
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: "Invalid email or password" })
  });

  it('Metodo Post - password incorreto', async () => {
    const mockFindByEmail = SequelizeUsers.build(mockUser);
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockFindByEmail)

    chaiHttpResponse = await chai.request(app).post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'testes'
      });
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: "Invalid email or password" })
  });

  it('Metodo Post - com campos corretos', async () => {
    // const mockToken = "dhgsjfhg";
    // sinon.stub(jwt, 'sign').returns(mockToken)
    const mockFindByEmail = SequelizeUsers.build(mockUser);
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockFindByEmail)

    chaiHttpResponse = await chai.request(app).post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'secret_user'
      });
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token')
    // expect(chaiHttpResponse.body).to.deep.equal({token: mockToken })
  });

  afterEach(sinon.restore);  
});

describe('Testes de integracao da rota login/role e middleware de autenticacao', () => {
  let chaiHttpResponse: Response;

  it('Metodo Get - sem token', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/role')
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: "Token not found" })
  });

  it('Metodo Get - com token invalido', async () => {
    sinon.stub(jwt, 'verify').throws()
    chaiHttpResponse = await chai.request(app).get('/login/role')
      .set('Authorization', 'Bearer token.false') 
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: "Token must be a valid token" })
  });

  it('Metodo Get - com token valido', async () => {
    sinon.stub(jwt, 'verify').callsFake(() => {
      return {data: {email: 'teste@teste.com', role: 'User'}}
    })
    chaiHttpResponse = await chai.request(app).get('/login/role')
      .set('Authorization', 'Bearer token.false') 
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({role: "User" })
  });

  afterEach(sinon.restore);  
});