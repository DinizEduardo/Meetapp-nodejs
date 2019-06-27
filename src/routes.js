import { Router } from 'express';
import UserController from './app/controllers/UserController';

const route = new Router();

route.post('/users', UserController.store);

route.put('/users', UserController.update);

export default route;
