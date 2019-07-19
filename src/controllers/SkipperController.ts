import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { AdjustParametrization } from '../entity/AdjustParametrization';
import { validate } from 'class-validator';

class SkipperController {
  static create = async (req: Request, res: Response) => {
    const adjustParametrizationRepository = getRepository(AdjustParametrization);
    const { name, description, origin } = req.body;
    const adjustReason = new AdjustParametrization();
    adjustReason.name = name;
    adjustReason.origin = origin;
    adjustReason.description = description;

    const errors = await validate(adjustReason);

    if (errors.length > 0) {
      res.status(400).send({ error: { code: 400, message: 'Existem dados inválidos', errors } });
      return;
    }

    try {
      await adjustParametrizationRepository.save(adjustReason);
    } catch (error) {
      res.status(500).send({ error: { code: 500, message: error } });
      return;
    }

    res.status(200).send({ message: 'Motivo de Ajuste cadastrado com sucesso' });
  };

  static update = async (req: Request, res: Response) => {
    const adjustParametrizationRepository = getRepository(AdjustParametrization);
    const { id, name, description, origin } = req.body;
    const adjustReason = new AdjustParametrization();
    adjustReason.id = id;
    adjustReason.name = name;
    adjustReason.origin = origin;
    adjustReason.description = description;

    const errors = await validate(adjustReason);

    if (errors.length > 0) {
      res.status(400).send({ error: { code: 400, message: 'Existem dados inválidos', errors } });
      return;
    }

    try {
      await adjustParametrizationRepository.save(adjustReason);
    } catch (error) {
      res.status(500).send({ error: { code: 500, message: error } });
      return;
    }

    res.status(200).send({ message: 'Motivo de Ajuste cadastrado com sucesso' });
  };

  static getAll = async (req: Request, res: Response) => {
    const adjustParametrizationRepository = getRepository(AdjustParametrization);
    const adjusts = await adjustParametrizationRepository.find();

    res.status(200).send(adjusts);
  };

  static getById = async (req: Request, res: Response) => {
    const adjustParametrizationRepository = getRepository(AdjustParametrization);
    const id = req.params.id;

    const adjusts = await adjustParametrizationRepository.findOneOrFail(id);

    res.status(200).send(adjusts);
  };

  static deleteReason = async (req: Request, res: Response) => {
    const id = req.params.id;

    const adjustParametrizationRepository = getRepository(AdjustParametrization);
    let reason: AdjustParametrization;
    try {
      reason = await adjustParametrizationRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    adjustParametrizationRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(200).send({ message: 'Motivo excluido com sucesso' });
  };
}

export default SkipperController;
