import { Request, Response } from 'express';
import TeamService from '../service/teamService';

export default class TeamController {
  service = new TeamService();

  getAll = async (req: Request, res: Response) => {
    const result = await this.service.findAll();
    return res.status(200).json(result);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.findById(Number(id));
    return res.status(200).json(result);
  };
}
