import { Request, Response } from 'express';
import { Angulator } from '../entity/Angulator';
import { getRepository } from 'typeorm';
import * as _ from 'lodash';
import { validate } from 'class-validator';

class AngulatorsController {
  static getAngulators = async (req: Request, res: Response) => {
    const name = req.query.name;
    const page = parseInt(req.query.page) || 1;
    const size = req.query.size || 3;

    const angularRespository = getRepository(Angulator);
    let angulators = [];

    try {
      if (name) {
        angulators = await angularRespository
          .createQueryBuilder('angular')
          .select(['angular.alterEgo', 'angular.realName', 'angular.id', 'angular.description', 'angular.thumbs'])
          .where('LOWER(alterEgo) = LOWER(:name) OR LOWER(realName) = LOWER(:name) ', { name })
          .getMany();
      } else {
        angulators = await angularRespository.find({ select: ['alterEgo', 'realName', 'id', 'description', 'thumbs'] });
      }
    } catch (error) {
      res.status(400).send({ code: 400, message: 'Não foi possivel buscar os Anguladores' });
      return;
    }

    const paginated = _.slice(angulators, (page - 1) * size, page * size);
    return res.status(200).send({ totalRegisters: angulators.length, data: paginated });
  };

  static saveAngulator = async (req: Request, res: Response) => {
    let { thumbs, alterEgo, realName, description, intelligence, strength, dexterity, status } = req.body;
    const angulator = new Angulator();
    angulator.thumbs = thumbs;
    angulator.alterEgo = alterEgo;
    angulator.realName = realName;
    angulator.description = description;
    angulator.intelligence = intelligence;
    angulator.strength = strength;
    angulator.dexterity = dexterity;
    angulator.status = status;

    const errors = await validate(angulator);

    if (errors.length > 0) {
      res.status(400).send({ code: 400, message: 'Existem dados inválidos', errors });
      return;
    }

    const angularRepository = getRepository(Angulator);

    try {
      await angularRepository.save(angulator);
    } catch (error) {
      res.status(400).send({ code: 400, message: 'Não foi possivel convocar o angulador' });
      return;
    }

    res.status(200).send({ message: 'Parabens, Angulador foi convocado!' });
  };

  static editAngulator = async (req: Request, res: Response) => {
    let { id, thumbs, alterEgo, realName, description, intelligence, strength, dexterity, status } = req.body;
    const angulator = new Angulator();
    angulator.id = id;
    angulator.thumbs = thumbs;
    angulator.alterEgo = alterEgo;
    angulator.realName = realName;
    angulator.description = description;
    angulator.intelligence = intelligence;
    angulator.strength = strength;
    angulator.dexterity = dexterity;
    angulator.status = status;

    const errors = await validate(angulator);

    if (errors.length > 0) {
      res.status(400).send({ code: 400, message: 'Existem dados inválidos', errors });
      return;
    }

    const angularRepository = getRepository(Angulator);

    try {
      await angularRepository.update(id, angulator);
    } catch (error) {
      res.status(400).send({ code: 400, message: 'Não foi possivel convocar o angulador' });
      return;
    }

    res.status(200).send({ message: 'Ok, Angulador foi atualizado!' });
  };

  static getAngulatorById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const angularRepository = getRepository(Angulator);
    let angulator = null;

    try {
      angulator = await angularRepository.findOneOrFail(id);
    } catch (error) {
      res.status(400).send({ code: 400, message: 'Nenhum angulador encontrado :/' });
      return;
    }

    res.status(200).send(angulator);
  };
}

export default AngulatorsController;
