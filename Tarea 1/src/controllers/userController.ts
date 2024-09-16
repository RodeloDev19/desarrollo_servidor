import { Request, Response } from 'express';

export const listAll = (req: Request, res: Response) => {
  res.send('lista de usuarios');
};