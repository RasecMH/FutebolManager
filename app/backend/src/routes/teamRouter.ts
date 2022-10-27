import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const controller = new TeamController();

teamRouter.get('/', controller.getAll);
teamRouter.get('/:id', controller.findById);

export default teamRouter;
