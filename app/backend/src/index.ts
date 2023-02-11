/* eslint-disable import/prefer-default-export */
import * as express from 'express';
import * as cors from 'cors';
import httpErrorMiddleware from './middlewares/errorMiddlewware';
import leaderboardRouter from './routes/leaderboardRouter';
import loginRouter from './routes/loginRouter';
import matchRouter from './routes/matchRouter';
import teamRouter from './routes/teamRouter';
import 'dotenv/config';

require('express-async-errors');

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors());

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamRouter);
    this.app.use('/matches', matchRouter);
    this.app.use('/leaderboard', leaderboardRouter);
    this.app.use(httpErrorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
