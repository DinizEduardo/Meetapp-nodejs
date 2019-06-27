import User from '../models/User';

class UserController {
  async store(req, res) {
    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    User = await User.findByPk(req.body.id);
    // encontra o usuario que quer dar update
    // coloca dentro da variavel que via dar update

    const user = await User.update(req.body);
    return res.json(user);
  }
}

export default new UserController();
