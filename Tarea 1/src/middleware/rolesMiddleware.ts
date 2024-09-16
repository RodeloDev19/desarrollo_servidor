import { Request, Response, NextFunction } from 'express';

const hardcodedUser = {
  username: 'john_doe',
  role: 'admin' //'gerente', 'admin' o 'cliente' para pruebas (cliente no permite ver la lista)
};

export const roles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = hardcodedUser.role;

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado: no tienes permisos suficientes' });
    }
  };
};