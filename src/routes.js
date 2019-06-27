import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const route = new Router();

route.post('/users', UserController.store);

route.put('/users', UserController.update);

route.post('/login', SessionController.store);

export default route;
