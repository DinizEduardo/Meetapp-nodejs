import { Router } from 'express';
import User from './app/models/User';

const route = new Router();

route.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Eduardo Diniz',
    email: 'eduardo01@gmail.com',
    password_hash: '123456',
  });

  return res.json(user);
});

export default route;
