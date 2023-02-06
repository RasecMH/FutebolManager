export interface UserLogin {
  email: string;
  password: string;
}

export interface IUser extends UserLogin {
  id: number;
  username: string;
  role: string
}
