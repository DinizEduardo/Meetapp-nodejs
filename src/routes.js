import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const route = new Router();

route.post('/users', UserController.store);

route.post('/login', SessionController.store);
// todas as rotas depois do use usaram esse middleware
route.use(authMiddleware);

route.put('/users', UserController.update);

export default route;
