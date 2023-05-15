import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';

export function verifyToken() {
  return (req: any, res: Response, next: NextFunction) => {
    const bearedHeader: string = req.headers['authorization'];

    if (bearedHeader) {
      const bearer = bearedHeader.split(' ');
      const token = bearer[1];

      try {
        const costumer: any = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        );

        req.token = token;
        req.costumer = costumer;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      res.sendStatus(403);
    }
  };
}

export function notFound(req, res: Response, next: NextFunction) {
  const error = new Error(`Not Found at ${req.originalUrl}`);
  res.status(404);
  next(error);
}