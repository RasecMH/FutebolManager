import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import MatchService from '../service/matchService';

export default class MatchController {
  service = new MatchService();

  getAll = async (req: Request, res: Response) => {
    const inProgress = req.query.inProgress ? req.query.inProgress !== 'true' : null;
    const result = await this.service.getAll(inProgress);
    return res.status(200).json(result);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.service.create(data);
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await this.service.update(Number(id), data);
    return res.status(StatusCodes.OK).json(result);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.finishMatch(Number(id));
    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.findById(Number(id));
    return res.status(200).json(result);
  };
}
