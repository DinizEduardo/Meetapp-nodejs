import User from '../models/User';

class UserController {
  async store(req, res) {
    const { id, name, email, password } = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res.json({
      id,
      name,
      email,
      password,
    });
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
