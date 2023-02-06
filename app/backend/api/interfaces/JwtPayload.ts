import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadInterface extends JwtPayload {
  payload: {
    role: string;
    id: number;
  }
}
