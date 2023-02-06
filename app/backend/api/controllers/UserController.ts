import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcryptjs';
import { createToken } from '../utils/jwt';
import HttpError from '../utils/httpError';
import UserService from '../service/userService';

export default class UserController {
  service = new UserService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await this.service.findByEmail(email);

      if (!user) throw new HttpError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

      const validatePassword = await compare(password, user.password);

      if (!validatePassword) {
        throw new HttpError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
      }

      const token = await createToken({ id: user.id, role: user.role });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  getRole = async (req: Request, res: Response) => {
    const { role } = req.body;
    res.status(200).json({ role });
  };
}
