import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const controller = new LeaderboardController();

leaderboardRouter.get('/home', controller.getHome);
leaderboardRouter.get('/away', controller.getAway);
leaderboardRouter.get('/', controller.getAll);

export default leaderboardRouter;
