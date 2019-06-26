import { Router } from 'express';

const route = new Router();

route.get('/', (req, res) => {
  res.json({ message: 'Hello Meetapp' });
});

export default route;
