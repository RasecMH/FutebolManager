export interface ErrorObj {
  status: number;
  message: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}
