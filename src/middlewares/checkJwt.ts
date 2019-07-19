import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token: string = <string>req.headers['authorization'];
  let jwtPayload: any;

  try {
    jwtPayload = <any>jwt.verify(token.split(' ')[1], config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send({ error: { code: 401, message: 'Token invalido ou expirado' } });
    return;
  }

  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, { expiresIn: '1h' });
  res.setHeader('token', newToken);

  next();
};
