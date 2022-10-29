import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboardService';

export default class LeaderboardController {
  service = new LeaderboardService();

  getAll = async (req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(StatusCodes.OK).json(result);
  };

  getHome = async (req: Request, res: Response) => {
    const result = await this.service.getAll('homeTeam');
    return res.status(StatusCodes.OK).json(result);
  };

  getAway = async (req: Request, res: Response) => {
    const result = await this.service.getAll('awayTeam');
    return res.status(StatusCodes.OK).json(result);
  };
}
