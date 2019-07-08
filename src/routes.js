import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import multerConfig from './config/multer';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';

const upload = multer(multerConfig);

const route = new Router();

route.post('/users', UserController.store);

route.post('/login', SessionController.store);
// todas as rotas depois do use usaram esse middleware
route.use(authMiddleware);

route.put('/users', UserController.update);

route.post('/files', upload.single('file'), FileController.store);

route.post('/meetups', MeetupController.store);

route.get('/meetups', MeetupController.index);

route.delete('/meetups/:id', MeetupController.delete);

route.put('/meetups/:id', MeetupController.delete);

route.post('/meetups/:id/subscription', SubscriptionController.store);

route.get('/meetups/:id/subscription', SubscriptionController.index);

export default route;
