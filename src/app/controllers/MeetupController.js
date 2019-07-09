import * as Yup from 'yup';

import {
  isBefore,
  startOfHour,
  parseISO,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async update(req, res) {
    const { userId } = req;
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.id_user !== userId) {
      return res.status(400).json({ error: 'Its not yours' });
    }

    const hourStart = startOfHour(parseISO(meetup.date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Cant change past meetups' });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const { userId } = req;

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.id_user !== userId) {
      return res.status(400).json({ error: 'Its not yours' });
    }

    const hourStart = startOfHour(parseISO(meetup.date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Cant delete past meetups' });
    }

    meetup.destroy();

    return res.json({ message: 'deleted' });
  }

  async index(req, res) {
    const {
      date = new Date().toISOString().split('T')[0], // pega apenas YYYY-MM-DD da data atual
      page = 1,
    } = req.query;
    // console.log(date);
    const parsedDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        date: { [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)] },
      },
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }

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

    const hourStart = startOfHour(parseISO(req.body.date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
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
