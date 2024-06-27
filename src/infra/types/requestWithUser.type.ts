import { Request } from 'express';

type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  permissions: string[];
};

export type RequestWithUser = Request & {
  user: User;
};
