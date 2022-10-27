import User from '../database/models/User';
import { IUser } from '../interfaces/UserInterface';

export default class UserService {
  model = User;

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ where: { email } });
  }
}
