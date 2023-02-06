import { Router } from 'express';
import validateMatchesFields from '../middlewares/validateMatchesFields';
import authenticate from '../middlewares/authenticate';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const controller = new MatchController();

matchRouter.patch('/:id/finish', controller.finishMatch);
matchRouter.patch('/:id', controller.update);
matchRouter.get('/:id', controller.findById);
matchRouter.get('/', controller.getAll);
matchRouter.post('/', authenticate, validateMatchesFields, controller.create);

export default matchRouter;
