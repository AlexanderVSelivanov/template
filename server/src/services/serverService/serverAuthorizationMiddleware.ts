import {NextFunction, Request, Response} from 'express';
import {Token, TokenPayload} from 'template-common';
import * as jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../../config';
import logger from '../loggerService';

const serverAuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req && req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(' ');
      if (authorization.length > 0) {
        const token: Token = authorization[1];
        jwt.verify(token, SECRET_KEY, (error, payload) => {
          if (payload) {
            if (error) {
              logger.error(`Token verify error: ${error}`);
            } else {
              const tokenPayload = payload as TokenPayload;
              req.auth = {
                userId: tokenPayload.userId,
              };
            }
          }
        });
      }
    }
  } catch (error) {
    logger.error(`Token check error: ${error}`);
  }
  next();
};

export default serverAuthorizationMiddleware;
