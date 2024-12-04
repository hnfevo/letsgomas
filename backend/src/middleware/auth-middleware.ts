import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../type/user-request';
import { prismaClient } from '../application/database';

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.get('X-API-TOKEN');

  if (token) {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });

    if (user) {
      req.user = user;
    }
  }

  next();
};

export const authorizeRole = (requiredRole: string) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ errors: 'Unauthorized' }).end();
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ errors: 'Forbidden: Access denied' }).end();
    }

    next();
  };
};
