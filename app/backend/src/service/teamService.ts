import { ITeam } from '../interfaces/TeamInterface';
import Team from '../database/models/Team';

export default class TeamService {
  model = Team;

  async findById(id: number): Promise<ITeam | null> {
    return this.model.findOne({ where: { id } });
  }

  async findAll(): Promise<ITeam[] | null> {
    return this.model.findAll();
  }
}
