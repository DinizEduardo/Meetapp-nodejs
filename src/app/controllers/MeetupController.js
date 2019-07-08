import * as Yup from 'yup';
import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(5),
      description: Yup.string()
        .required()
        .min(5),
      location: Yup.string()
        .required()
        .min(6),
      date: Yup.date().required(),
      id_file: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const file = await File.findByPk(req.body.id_file);
    if (!file) {
      return res.json({ error: 'id_file not found' });
    }

    const id_user = req.userId;
    const all = await Meetup.create({
      ...req.body,
      id_user,
    });

    return res.json(all);
  }
}

export default new MeetupController();
