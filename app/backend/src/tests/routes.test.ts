import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../index';
import User from '../database/models/User';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { noEmailReq,
  noPasswordReq,
  validLoginReq,
  invalidEmailReq,
  invalidPasswordReq,
  createMatchReq,
  invalidMatchReq,
  invalidTeamMatchReq,
  updateMatchReq,
  
  } from './mocks/requisitions';
import { userRes,
  teamByIdRes,
  teamsArrayRes,
  allMatchesRes,
  inProgressMatches,
  finishMatches,
  createdMatchRes,
  updatedMatchRes,
  validJwtReturnRes,
  leaderboardsRes,
  homeLeaderboardsRes,
  awayLeaderboardsRes
} from './mocks/responses';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota de login', () => {
  afterEach(sinon.restore)
  it('Se retorna a messagem correta ao não enviar o email', async () => {
    const {status, body} = await chai.request(app).post('/login').send(noEmailReq);
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({message: 'All fields must be filled'})
  });

  it('Se retorna a messagem correta ao não enviar o Password', async () => {
    const {status, body} = await chai.request(app).post('/login').send(noPasswordReq);
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({message: 'All fields must be filled'})
  });

  it('Se middleware de error retornar erros genericos', async () => {
    sinon.stub(User, 'findOne').throws(Error('internal server error'))
    const {status, body} = await chai.request(app).post('/login').send(validLoginReq);
    expect(status).to.be.equal(500);
    expect(body).to.be.deep.equal({message: 'internal server error'})
  });

  it('Se ao enviar um email que não existe retorna a mesagem correta', async () => {
    sinon.stub(User, 'findOne').resolves(null)
    const {status, body} = await chai.request(app).post('/login').send(invalidEmailReq);
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Incorrect email or password'})
  });

  it('Se ao enviar uma password incorreta retorna a mesagem correta', async () => {
    sinon.stub(User, 'findOne').resolves(userRes as User);
    sinon.stub(bcrypt, 'compare').resolves(false);
    const {status, body} = await chai.request(app).post('/login').send(invalidPasswordReq);
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Incorrect email or password'})
  });

  it('Se ao enviar sem um authorization headers retorna a mesagem correta', async () => {
    const {status, body} = await chai.request(app).get('/login/validate');
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Token must be a valid token" })
  });

  it('Se ao enviar um token invalido na headers retorna a mesagem correta', async () => {
    const {status, body} = await chai.request(app).get('/login/validate').set('authorization', 'invalidToken');
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Token must be a valid token" })
  });

  it('Se caso o payload do jwt retorne sem o role retorna a mesagem correta', async () => {
    sinon.stub(jwt, 'verify').resolves({id: 1});
    const {status, body} = await chai.request(app).get('/login/validate').set('authorization', 'invalidToken');
    expect(status).to.be.equal(500);
    expect(body).to.be.deep.equal({ message: 'Erro ao verificar token' })
  });

  it('Se retorna um token ao enviar um login válido', async () => {
    sinon.stub(User, 'findOne').resolves(userRes as User);
    sinon.stub(jwt, 'sign').resolves('validToken');
    sinon.stub(bcrypt, 'compare').resolves(true);
    const {status, body} = await chai.request(app).post('/login').send(validLoginReq);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ token: "validToken" })
  });

  it('Se retorna uma role ao logar com sucesso', async () => {
    sinon.stub(User, 'findOne').resolves(userRes as User);
    sinon.stub(bcrypt, 'compare').resolves(true);
    const getToken = await chai.request(app).post('/login').send(validLoginReq)    
    const {status, body} = await chai.request(app).get('/login/validate').set('authorization', getToken.body.token);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ role: "admin" })
  });
});

describe('Testa a rota de teams', () => {
  afterEach(sinon.restore)
  it('Se retorna todos os times', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsArrayRes as Team[]);
    const {status, body} = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsArrayRes)
  });

  it('Se retorna a messagem correta ao enviar um id', async () => {
    sinon.stub(Team, 'findOne').resolves(teamByIdRes as Team);
    const {status, body} = await chai.request(app).get('/teams/1');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({
      id: 1,
      teamName: 'Avaí/Kindermann',
    })
  });
});

describe('Testa a rota de matches', () => {
  afterEach(sinon.restore)

  it('Se ao enviar dois times iguais retorna a messagem correta', async () => {
    sinon.stub(jwt, 'verify').resolves(validJwtReturnRes);
    const {status, body} = await chai.request(app).post('/matches').send(invalidMatchReq).set('authorization', 'validToken');;
    expect(status).to.be.equal(422);
    expect(body).to.be.deep.equal({message: 'It is not possible to create a match with two equal teams'})
  });

  it('Se ao enviar um time invalido retorna a messagem correta', async () => {
    sinon.stub(jwt, 'verify').resolves(validJwtReturnRes);
    sinon.stub(Team, 'findOne').resolves(null);
    const {status, body} = await chai.request(app).post('/matches').send(invalidTeamMatchReq).set('authorization', 'validToken');;
    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({message: 'There is no team with such id!'})
  });

  it('Se retorna todos os matches', async () => {
    sinon.stub(Match, 'findAll').resolves(allMatchesRes as Match[]);
    const {status, body} = await chai.request(app).get('/matches');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(allMatchesRes)
  });

  it('Se retorna todos os matches em progresso', async () => {
    sinon.stub(Match, 'findAll').resolves(inProgressMatches as Match[]);
    const {status, body} = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(inProgressMatches)
  });

  it('Se retorna todos os matches em progresso', async () => {
    sinon.stub(Match, 'findAll').resolves(finishMatches as Match[]);
    const {status, body} = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(finishMatches)
  });

  it('Se é possível criar uma nova partida', async () => {
    sinon.stub(User, 'findOne').resolves(userRes as User);
    sinon.stub(bcrypt, 'compare').resolves(true);
    sinon.stub(Match, 'create').resolves(createdMatchRes as Match);
    const getToken = await chai.request(app).post('/login').send(validLoginReq)  
    const {status, body} = await chai.request(app).post('/matches').send(createMatchReq).set('authorization', getToken.body.token);
    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal(createdMatchRes)
  });

  it('Se é possível finalizar uma partida', async () => {
    sinon.stub(Match, 'update');
    const {status, body} = await chai.request(app).patch('/matches/1/finish');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({message: 'Finished'})
  });
  
  it('Se é possível atualizar uma partida', async () => {
    sinon.stub(Match, 'update');
    sinon.stub(Match, 'findOne').resolves(updatedMatchRes as Match)
    const {status, body} = await chai.request(app).patch('/matches/1').send(updateMatchReq);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(updatedMatchRes)
  });

  it('Se é possível encontrar uma partida pelo id', async () => {
    sinon.stub(Match, 'findOne').resolves(updatedMatchRes as Match)
    const {status, body} = await chai.request(app).get('/matches/1');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(updatedMatchRes)
  });

  it('Se é criado e retornado um leaderboard dos times', async () => {
    sinon.stub(Match, 'findAll').resolves(finishMatches as Match[]);
    sinon.stub(Team, 'findAll').resolves(teamsArrayRes as Team[]);
    const {status, body} = await chai.request(app).get('/leaderboard');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderboardsRes)
  });

  it('Se é criado e retornado um leaderboard dos times de home', async () => {
    sinon.stub(Match, 'findAll').resolves(finishMatches as Match[]);
    sinon.stub(Team, 'findAll').resolves(teamsArrayRes as Team[]);
    const {status, body} = await chai.request(app).get('/leaderboard/home');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(homeLeaderboardsRes)
  });

  it('Se é criado e retornado um leaderboard dos times de away', async () => {
    sinon.stub(Match, 'findAll').resolves(finishMatches as Match[]);
    sinon.stub(Team, 'findAll').resolves(teamsArrayRes as Team[]);
    const {status, body} = await chai.request(app).get('/leaderboard/away');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(awayLeaderboardsRes)
  });


});
