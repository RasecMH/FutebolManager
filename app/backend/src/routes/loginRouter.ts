import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import validateLoginFields from '../middlewares/validateLoginFields';
import UserController from '../controllers/UserController';

const loginRouter = Router();
const controller = new UserController();

loginRouter.post('/', validateLoginFields, controller.login);
loginRouter.get('/validate', authenticate);

export default loginRouter;
